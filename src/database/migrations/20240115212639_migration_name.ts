import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('user', function(table) {
      table.increments('id');
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.timestamps(true, true);
    })
    .createTable('wallet', function(table) {
      table.increments('id');
      table.decimal('balance', 10, 2).defaultTo(0).notNullable();
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('user.id');
      table.timestamps(true, true);
    })
    .createTable('transaction', function(table) {
      table.increments('id');
      table.string('type').notNullable();
      table.integer('sender').unsigned().notNullable();
      table.foreign('sender').references('user.id');
      table.integer('receiver').unsigned().notNullable();
      table.foreign('receiver').references('user.id');
      table.decimal('amount', 10, 2).notNullable();
      table.string('description').notNullable();
      table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTableIfExists('transaction')
    .dropTableIfExists('wallet')
    .dropTableIfExists('user');
}

