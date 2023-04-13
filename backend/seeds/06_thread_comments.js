/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { faker} = require("@faker-js/faker");

exports.seed = async function(knex) {
  await knex('thread_comments').insert([
    {thread_id:1, comment_author: 3, comment_content: faker.lorem.paragraph(), comment_timestamp:knex.fn.now()},
    {thread_id:1, comment_author: 6, comment_content: faker.lorem.paragraph(), comment_timestamp:knex.fn.now()},
    {thread_id:1, comment_author: 12, comment_content: faker.lorem.paragraph(), comment_timestamp:knex.fn.now()},
  ]);
};
