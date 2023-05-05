/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
//  exports.up = function (knex) {
//     return knex.schema.createTable('users', (table) => {
//       table.uuid('id').primary();
//       table
//         .uuid('user_id')
//         .references('user.id')
//         .onUpdate('CASCADE')
//         .onDelete('CASCADE');
//       table.string('user_name').notNullable();
//       table.string('user-password').notNullable();
      
//     });
//   };
  
//   /**
//    * @param { import("knex").Knex } knex
//    * @returns { Promise<void> }
//    */
//   exports.down = function (knex) {
//     return knex.schema.dropTable('users');
//   };
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('users').del();
    await knex('users').insert([
      {
        user_id: '1',
        username: 'Deboeasy',
        password: '123456',
      },

      {
        user_id: '2',
        username: 'AlejandroLoco',
        password: '456012',
      },

      {
        user_id: '3',
        username: 'Deboeasy',
        password: '6785677',
      }
    ]);
  };
  