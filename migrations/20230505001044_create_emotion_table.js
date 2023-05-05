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
    table.string('top_emotion').notNullable();
    table.float('positive').notNullable();
    table.float('negative').notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('emotion')
};
