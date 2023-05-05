/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
      table.uuid('id').primary();
      table
        .uuid('user_id')
        .references('user.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('user_name').notNullable();
      table.string('user-password').notNullable();
      
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('users');
  };
  