import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // users
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.uuid('uuid_user').notNullable().unique();
    table.string('name').notNullable();
    table.string('last_name').notNullable();
    table.string('borned').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  // user_profile
  await knex.schema.createTable('user_profile', (table) => {
    table.increments('id').primary();
    table.uuid('uuid_user_profile').notNullable().unique();
    table.string('condominium_name').notNullable();
    table.string('apartment_block').notNullable();
    table.string('apartment').notNullable();
    table.enum('type_user', [
      'OWNER',
      'TENANT',
      'BUILDING_MANAGER',
      'CARETAKER',
      'STAFF',
      'ADMIN'
    ]).notNullable();
    table.uuid('uuid_user_fk').notNullable()
      .references('uuid_user').inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  // user_access
  await knex.schema.createTable('user_access', (table) => {
    table.increments('id').primary();
    table.uuid('uuid_user_access').notNullable().unique();
    table.string('phone_number').notNullable();
    table.string('password').notNullable();
    table.uuid('uuid_user_profile_fk').notNullable()
      .references('uuid_user_profile').inTable('user_profile')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  // package_received
  await knex.schema.createTable('package_received', (table) => {
    table.increments('id').primary();
    table.uuid('uuid_package_received').notNullable().unique();
    table.enum('status', ['RECEBIDO', 'ENTREGUE']).notNullable();
    table.timestamp('date_received').defaultTo(knex.fn.now());
    table.timestamp('date_delivered');
    table.uuid('uuid_profile_fk').notNullable()
      .references('uuid_user_profile').inTable('user_profile')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('package_received');
  await knex.schema.dropTableIfExists('user_access');
  await knex.schema.dropTableIfExists('user_profile');
  await knex.schema.dropTableIfExists('users');
}
