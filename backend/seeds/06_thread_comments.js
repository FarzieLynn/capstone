/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { faker} = require("@faker-js/faker");

exports.seed = async function(knex) {
  await knex('thread_comments').insert([
    {id: 1, thread_id:1, comment_author: 3, comment_content: faker.lorem.paragraph(), comment_timestamp:knex.fn.now()},
    {id: 2, thread_id:1, comment_author: 6, comment_content: faker.lorem.paragraph(), comment_timestamp:knex.fn.now()},
    {id: 3, thread_id:1, comment_author: 12, comment_content: faker.lorem.paragraph(), comment_timestamp:knex.fn.now()},
  ]);
};
