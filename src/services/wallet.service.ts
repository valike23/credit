import { Iuser } from "../helpers/knex/users.helpher";
import { createWallet, fundAccount, getWallet, transferFundsWallet, withdrawFunds } from "../helpers/knex/wallet.helper";
import { Ireturn } from "./dto/accounts/model";
export interface Iwallet {
    id: number,
    balance: number;
    user_id: number
}
export class WalletService {
    private users: Iuser[] = [];
    private user_id: number = 0;


    public createWallet(userId: number) {
        this.user_id = userId;
        return createWallet(userId)
    }
    public async getWallet(userId: number){
        return await getWallet(userId);
    }

    public async fundUser(userId: number, amount: number): Promise<any> {

        try {
            let resp = await fundAccount(userId, amount);

            let response: Ireturn = { status: 200, data: resp, msg: 'account was creditted successful' }

            if (resp) return response;
        } catch (error: any) {
            console.log('error', error);
            return { status: 503, data: error, msg: error.msg }
        }
    }

    public async transferFunds(senderId: number, recipientId: number, amount: number): Promise<any> {
        try {
            let resp = await transferFundsWallet(senderId, recipientId, amount);

            let response: Ireturn = { status: 200, data: resp, msg: 'transfer is successful' }

            if (resp) return response;
        } catch (error: any) {
            console.log('error', error);
            return { status: 503, data: error, msg: error.msg }
        }
    }

    public async withdrawFunds(userId: number, amount: number): Promise<any> {
        try {
            let resp = await withdrawFunds(userId, amount);
            let response: Ireturn = { status: 200, data: resp, msg: 'withdrawal is successful' };

            if (resp) return response;
        } catch (error: any) {
            console.log('error', error);
            return { status: 503, data: error, msg: error.msg }
        }
    }


}