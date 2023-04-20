/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */



exports.seed = async function (knex) {


  const genData = async () => {
    const { faker } = require("@faker-js/faker");
    await knex('thread_comments').insert([
      { thread_id: 1, comment_author: 3, comment_content: faker.lorem.paragraph(), comment_timestamp: knex.fn.now() },
      { thread_id: 1, comment_author: 6, comment_content: faker.lorem.paragraph(), comment_timestamp: knex.fn.now() },
      { thread_id: 1, comment_author: 5, comment_content: faker.lorem.paragraph(), comment_timestamp: knex.fn.now() },
    ]);
  }
  if (process.env.NODE_ENV !== 'production') await genData();
};
