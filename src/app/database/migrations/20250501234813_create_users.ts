import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.uuid('uuid_user').notNullable().unique();
      table.string('name').notNullable();
      table.string('last_name').notNullable();
      table.string('phone_number').notNullable();
      table.string('apartment_block').notNullable();
      table.string('apartment').notNullable();
      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }
  
  export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
  }

