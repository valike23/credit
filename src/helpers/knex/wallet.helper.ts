import { Iwallet } from "../../services/wallet.service";
import { Knex } from "./init";

export const transferFundsWallet = async (fromAccountId: number, toAccountId: number, amount: number) => {
    try {
        return await Knex.transaction(async (trx) => {
            // Lock both account rows to ensure data consistency
            await trx.raw('SELECT * FROM wallet WHERE user_id IN (?, ?) FOR UPDATE', [fromAccountId, toAccountId]);
            if(fromAccountId == toAccountId) throw { msg: 'Cant transfer to yourself' };
            // Update the balance of the source account
            const fromAccount = await trx('wallet')
                .where('user_id', fromAccountId)
                .first();
                if(fromAccount == undefined) {throw {msg:'User not found'}}
            if (fromAccount.balance < amount) {
                throw { msg: 'Insufficient balance' };
            }
            await trx('wallet')
                .where('user_id', fromAccountId)
                .decrement('balance', amount);

            // Update the balance of the destination account
            const toAccount = await trx('wallet')
                .where('user_id', toAccountId)
                .first();
                console.log('accounts', toAccount);
            if(toAccount == undefined) {throw {msg:'User not found'}}
            await trx('wallet')
                .where('user_id', toAccountId)
                .increment('balance', amount);

            // Record the transaction
            await trx('transaction').insert({
                sender: fromAccountId,
                receiver: toAccountId,
                description: `you just transferred your account with ${amount}`,
                type: 'transfer',
                amount: amount,
            });

            // Return the updated accounts
            return {
                fromAccount,
                toAccount,
            };
        });
    } catch (error) {
        console.error('test erroe', error);
        throw error;
    }
};

export const withdrawFunds = async (userId: number, amount: number) => {
    try {
        // Start a transaction to ensure data consistency
        return await Knex.transaction(async (trx) => {
            // Lock the user's account row to ensure data consistency
            await trx.raw('SELECT * FROM wallet WHERE id = ? FOR UPDATE', [userId]);

            // Update the user's account balance
            const wallet = await trx('wallet')
                .where('user_id', userId)
                .first();
                if(wallet == undefined) {throw {msg:'User not found'}}
            if (wallet.balance < amount) {

                throw { msg: 'Insufficient balance' };
            }
            await trx('wallet')
                .where('user_id', userId)
                .decrement('balance', amount);

            // Record the transaction
            await trx('transaction').insert({
                sender: userId,
                receiver: userId,
                description: `you just debitted your account with ${amount}`,
                type: 'withdrawal',
                amount: amount,
            });



            // Return the updated user object
            return await trx('user')
                .where('user.id', userId)
                .select('email', 'name', "wallet.*")
                .leftJoin("wallet", "user.id", "wallet.user_id")
                .first();
        });
    } catch (error) {
        console.error(error);
        // Rollback the transaction if an error occurs
        throw error;
    }
};

export const fundAccount = async (userId: number, amount: number) : Promise<any> =>{
    try {
        // Start a transaction to ensure data consistency
        return await Knex.transaction(async (trx) => {
            // Lock the user's account row to ensure data consistency
            await trx.raw('SELECT * FROM wallet WHERE id = ? FOR UPDATE', [userId]);

            // Update the user's account balance

            await trx('wallet')
                .where('user_id', userId)
                .increment('balance', amount);

            // Record the transaction
            await trx('transaction').insert({
                sender: userId,
                receiver: userId,
                description: `you just creditted your account with ${amount}`,
                type: 'credit',
                amount: amount,
            });



            // Return the updated user object
            return await trx('user')
                .where('user.id', userId)
                .select('email', 'name', "wallet.*")
                .leftJoin("wallet", "user.id", "wallet.user_id")
                .first();
        });
    } catch (error) {
        console.error(error);
        // Rollback the transaction if an error occurs
        throw error;
    }
};

export const createWallet = async (id: number) => {
    const [wallet] = await Knex('wallet')
        .insert({ balance: 0, user_id: id })
        .returning('*');
    return wallet as Iwallet;
}

export const getWallet = async (id: number) => {
  return  await Knex('user')
                .where('user.id', id)
                .select('email', 'name', "wallet.*")
                .leftJoin("wallet", "user.id", "wallet.user_id")
                .first();
        
}