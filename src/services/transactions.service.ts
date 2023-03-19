import { createTransactions } from "../helpers/knex/transactions/transaction.helpers";
import { fundAccount, transferFunds, withdrawFunds } from "../helpers/knex/users/user.helpers";
import { Ireturn, Itransfer } from "./dto/accounts/model";


export class transactionsService {
    constructor() {
        
    }
    async transferFund(transferDTO: Itransfer, myId: number): Promise<any>{
        console.log(transferDTO, myId);
    try {
        let resp = await transferFunds(myId, transferDTO.accountNumber, transferDTO.amount);
        console.log('resp', resp);
        let response: Ireturn = {status: 200, data:resp, msg: 'transfer is successful'}
        //create transaction
       
      if(resp) return response;
         

    } catch (error : any) {
        console.log('error', error);
       return {status: 503, data:error, msg: error.msg}
    }
          
         
       
    }
    async withdrawalFund(amount: number, myId: number): Promise<Ireturn>{
      try {
        let resp = await withdrawFunds(myId, amount);
        console.log('resp', resp);
        let response: Ireturn = {status: 200, data:resp, msg: 'withdrawal is successful'}
        return response;
      } catch (error) {
        console.log('error', error);
        return {status: 503, data:error, msg: 'something went wrong'}
      }
    }
    async creditWallet(amount: number, myId: number) :Promise<Ireturn>{
        try {
            let resp = await fundAccount(myId, amount);
            console.log('resp', resp);
            let response: Ireturn = {status: 200, data:resp, msg: 'credit action is successful'}
            return response;
          } catch (error) {
            console.log('error', error);
            return {status: 503, data:error, msg: 'something went wrong'}
          }
    }
}