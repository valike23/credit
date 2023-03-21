import { Knex } from "./init";

export interface Iuser {
    id: number;
    name: string;
    email: string;
    password: string;
}

export const createUser =async (email: string, password: string, name: string)=>{
    const [user] = await Knex('user')
    .insert({ email, password, name })
    .returning('*');
  return user as Iuser;
}

export async function findUserByEmail(email: string): Promise<Iuser | null> {
    const [user] = await Knex('user')
      .where({ email })
      .select('*');
    return user || null;
  }