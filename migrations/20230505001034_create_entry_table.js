/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('entry', (table) => {
    table.increments('id').primary();
    table.string('entry').notNullable();
    table.integer('user_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('user')
    .onUpdate('CASCADE')
    .onDelete('CASCADE')
    table.timestamp('timestamp').defaultTo(knex.fn.now());
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('entry');
};
