import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.renameTable('package', 'received_parcels');
};

export async function down(knex: Knex): Promise<void> {
  await knex.schema.renameTable('received_parcels', 'package');
};


