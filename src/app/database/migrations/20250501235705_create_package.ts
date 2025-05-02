import type { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable('packages', (table) => {
    table.increments('id').primary();
    table.string('uuid_receipt').notNullable().unique();
    table.string('uuid_user_fk').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.foreign('uuid_user_fk').references('uuid_user').inTable('users');
  });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTableIfExists('packages');
};
