import knex from "knex";
import { Knex } from "../init";
import { Iuser } from "./user.schema";


export async function createUser(email: string, password: string): Promise<Iuser> {
    const [user] = await Knex('users')
      .insert({ email, password, balance: 0 })
      .returning('*');
    return user as Iuser;
  }

  export async function findUserByEmail(email: string): Promise<Iuser | null> {
    const [user] = await Knex('users')
      .where({ email })
      .select('*');
    return user || null;
  }

  export async function updateUserBalance(id: number, amount: number): Promise<void> {
    await Knex('users')
      .where({ id })
      .update({ balance: Knex.raw('balance + ?', [amount]) });
  }

  export const transferFunds = async (fromAccountId: number, toAccountId: number, amount: number) => {
    try {
      return await Knex.transaction(async (trx) => {
        // Lock both account rows to ensure data consistency
        await trx.raw('SELECT * FROM users WHERE id IN (?, ?) FOR UPDATE', [fromAccountId, toAccountId]);
  
        // Update the balance of the source account
        const fromAccount = await trx('users')
          .where('id', fromAccountId)
          .first();
        if (fromAccount.balance < amount) {
          throw {msg:'Insufficient balance'};
        }
        await trx('users')
          .where('id', fromAccountId)
          .decrement('balance', amount);
  
        // Update the balance of the destination account
        const toAccount = await trx('users')
          .where('id', toAccountId)
          .first();
        await trx('users')
          .where('id', toAccountId)
          .increment('balance', amount);
  
        // Return the updated accounts
        return {
          fromAccount,
          toAccount,
        };
      });
    } catch (error) {
      console.error('test erroe',error);
      throw error;
    }
  };

  export const withdrawFunds = async (userId: number, amount: number) => {
    try {
      // Start a transaction to ensure data consistency
      return await Knex.transaction(async (trx) => {
        // Lock the user's account row to ensure data consistency
        await trx.raw('SELECT * FROM users WHERE id = ? FOR UPDATE', [userId]);
  
        // Update the user's account balance
        const user = await trx('users')
          .where('id', userId)
          .first();
        if (user.balance < amount) {
          trx.rollback();
          throw new Error('Insufficient balance');
        }
        await trx('users')
          .where('id', userId)
          .decrement('balance', amount);
  
        // Record the transaction
        await trx('transactions').insert({
          user_id: userId,
          type: 'withdrawal',
          amount: amount,
        });
  
        // Commit the transaction
        trx.commit();
  
        // Return the updated user object
        return await trx('users')
          .where('id', userId)
          .first();
      });
    } catch (error) {
      console.error(error);
      // Rollback the transaction if an error occurs
      throw error;
    }
  };
  
  
  
