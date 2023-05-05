/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('user').del();
    await knex('user').insert([
      {
        id: '1',
        username: 'Deboeasy',
        password: '123456',
      },

      {
        id: '2',
        username: 'AlejandroLoco',
        password: '456012',
      },

      {
        id: '3',
        username: 'GIGI',
        password: '123456',
      }
    ]);
  };
 