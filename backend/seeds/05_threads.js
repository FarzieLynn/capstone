/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { faker} = require("@faker-js/faker");

exports.seed = async function(knex) {
  await knex('threads').insert([
    {id: 1, thread_author: 3, thread_content: faker.lorem.paragraph(), thread_timestamp:knex.fn.now()},
    {id: 2, thread_author: 6, thread_content: faker.lorem.paragraph(), thread_timestamp:knex.fn.now()},
    {id: 3, thread_author: 8, thread_content: faker.lorem.paragraph(), thread_timestamp:knex.fn.now()},
  ]);
};
