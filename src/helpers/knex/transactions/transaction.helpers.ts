import { Knex } from "../init";
import { Itransaction } from "./transaction.schema";


export async function createTransactions(trans: Itransaction): Promise<any> {
    const [transaction] = await Knex('transactions')
      .insert(trans)
      .returning('*');
    return transaction as Itransaction;
  }