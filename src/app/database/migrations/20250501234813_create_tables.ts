import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {

  // USERS
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.uuid('uuid_user').notNullable().unique();
    table.string('uuid_usar_profile_fk', 40).notNullable().unique().references('uuid_user_profile').inTable('user_profile');
    table.string('name', 50).notNullable();
    table.string('last_name', 100).notNullable();
    table.date('borned').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at');
    table.tinyint('deleted').defaultTo(0);
  });

  // USER_PROFILE
  await knex.schema.createTable('user_profile', (table) => {
    table.increments('id').primary();
    table.uuid('uuid_user_profile').notNullable().unique();
    table.string('uuid_user_fk', 40).notNullable().unique().references('uuid_user').inTable('users');
    table.string('uuid_condominium_fk', 40).notNullable();
    table.string('apartment_block', 20).notNullable();
    table.integer('apartment').notNullable();
    table.string('phone_number', 30).notNullable().unique();
    table.enum('type_profile', [
      'ADMIN',
      'TENANT',
      'TRUSTEE',
      'EMPLOYEE',
      'RESIDENT',
      'OWNER'
    ]).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at');
    table.tinyint('deleted').defaultTo(0);
  });

  // USER_ACCESS
  await knex.schema.createTable('user_access', (table) => {
    table.increments('id').primary();
    table.uuid('uuid_user_access').notNullable().unique();
    table.uuid('uuid_user_profile_fk').notNullable().references('uuid_user_profile').inTable('user_profile');
    table.enum('status', [
      'ACTIVE',
      'INACTIVE'
    ]).notNullable();
    table.string('password', 200).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at');
    table.tinyint('deleted').defaultTo(0);
  });

  // CONDOMINIUM
  await knex.schema.createTable('condominium', (table) => {
    table.increments('id').primary();
    table.uuid('uuid_condominium').notNullable().unique();
    table.string('condominium_name').notNullable();
    table.string('address').notNullable();
    table.string('address_number').notNullable();
    table.string('cep').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at');
    table.tinyint('deleted').defaultTo(0);
  });

  // NOTE_DATA
  await knex.schema.createTable('note_data', (table) => {
    table.increments('id').primary();
    table.uuid('uuid_note_data').notNullable().unique();
    table.uuid('uuid_condominium_fk').notNullable().references('uuid_condominium').inTable('condominium')
    table.integer('read').notNullable().defaultTo(0);
    table.text('content').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at');
    table.tinyint('deleted').defaultTo(0);
  });

  // PACKAGE
  await knex.schema.createTable('package', (table) => {
    table.increments('id').primary();
    table.uuid('uuid_package').notNullable().unique();
    table.uuid('uuid_user_profile_receiver').notNullable().references('uuid_user_profile').inTable('user_profile');
    table.uuid('uuid_user_profile_owner').notNullable().references('uuid_user_profile').inTable('user_profile');
    table.enum('status_package', [
      'RECEIVED',
      'DELIVERED',
      'WAITING'
    ]);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at');
    table.tinyint('deleted').defaultTo(0);
  });

  // NOTIFICATION
  await knex.schema.createTable('notification', (table) => {
    table.increments('id').primary();
    table.uuid('uuid_notification').notNullable().unique();
    table.uuid('uuid_package_fk').notNullable().references('uuid_package').inTable('package')
    table.enum('status', [
      'SENDED',
      'READ'
    ]).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at');
    table.tinyint('deleted').defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users')
  await knex.schema.dropTableIfExists('notification');
  await knex.schema.dropTableIfExists('package');
  await knex.schema.dropTableIfExists('note_data');
  await knex.schema.dropTableIfExists('condominium');
  await knex.schema.dropTableIfExists('user_access');
  await knex.schema.dropTableIfExists('user_profile');
}
