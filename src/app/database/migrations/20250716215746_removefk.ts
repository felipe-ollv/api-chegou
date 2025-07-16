import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.dropForeign('uuid_user_profile_fk');
    table.dropColumn('uuid_user_profile_fk');
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.string('uuid_user_profile_fk', 40).notNullable().unique();
  });
}

