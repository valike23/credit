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
