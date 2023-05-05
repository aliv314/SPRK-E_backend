/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const userData = require('../seed_data/user');
const entryData = require('../seed_data/entry');
const emotionData = require('../seed_data/emotion')

exports.seed = function (knex) {
return knex('user')
  .del()
  .then(function () {
    return knex('user').insert(userData);
  })
  .then(() => {
    return knex('entry').del();
  })
  .then(() => {
    return knex('entry').insert(entryData);
  }).then(() =>{
    return knex('emotion').del();
  }).then(() => {
    return knex('emotion').insert(emotionData);
  });
};