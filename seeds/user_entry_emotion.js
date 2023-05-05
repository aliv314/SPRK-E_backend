/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const userData = require('../seed_data/user');
const entryData = require('../seed_data/entry');

exports.seed = function (knex) {
return knex('user')
  .del()
  .then(function () {
    return knex('warehouse').insert(userData);
  })
  .then(() => {
    return knex('entry').del();
    return knex('emotion').del();
  })
  .then(() => {
    return knex('entry').insert(entryData);
  });
};