import { Knex } from "knex";


export async function up(knex: Knex): Promise<[void,void]> {
 const transactions: any = knex.schema.createTable('transactions', (table) => {
        table.increments('id').primary();
        table.integer('from_user_id').unsigned().notNullable().references('id').inTable('users');
        table.integer('to_user_id').unsigned().notNullable().references('id').inTable('users');
        table.decimal('amount', 10, 2).notNullable();
        table.decimal('type',10,2).notNullable();
        table.timestamp('timestamp').notNullable().defaultTo(knex.fn.now());
      });
const users =  knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.decimal('balance', 10, 2).notNullable().defaultTo(0);
  });

  return Promise.all([transactions, users]);

}




export async function down(knex: Knex): Promise<[void,void]> {
    let trans =  knex.schema.dropTable('transactions');
    let users =  knex.schema.dropTable('users');
   return  Promise.all([trans, users])
  
   
}

