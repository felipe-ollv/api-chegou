import type { Knex } from "knex";


export async function up(knex: Knex) {
  return knex.schema.renameTable('received_parcels', 'received_package');
};

export async function down(knex: Knex) {
  return knex.schema.renameTable('received_package', 'received_parcels');
};

