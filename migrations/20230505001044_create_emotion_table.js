/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('emotion', (table) => {
    table.increments('id').primary();
    table.integer('user_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('user')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
    table.timestamp('timestamp').defaultTo(knex.fn.now());
    table.float('positive').notNullable();
    table.float('negative').notNullable();
    table.float('anger').notNullable();
    table.float('frustration').notNullable();
    table.float('fear').notNullable();
    table.float('confusion').notNullable();
    table.float('disappointment').notNullable();
    table.float('confidence').notNullable();
    table.float('joy').notNullable();
    table.float('satisfaction').notNullable();
    table.float('compassion').notNullable();
    table.float('enthusiasm').notNullable();
    table.float('thoughtful').notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('emotion')
};
