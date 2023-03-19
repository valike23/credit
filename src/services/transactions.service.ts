import { createTransactions } from "../helpers/knex/transactions/transaction.helpers";
import { transferFunds } from "../helpers/knex/users/user.helpers";
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
       const transaction = await createTransactions({amount: transferDTO.amount, from_user_id: myId, to_user_id: transferDTO.accountNumber})

      if(transaction) return response;
         

    } catch (error : any) {
        console.log('error', error);
       return {status: 503, data:error, msg: error.msg}
    }
          
         
       
    }
    async withdrawalFund(){

    }
    async creditWallet(){

    }
}