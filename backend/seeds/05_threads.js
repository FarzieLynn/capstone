/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */



exports.seed = async function (knex) {


  const genData = async () => {
    const { faker } = require("@faker-js/faker");
    await knex('threads').insert([
      { thread_author: 3, thread_title: 'Title!', thread_content: faker.lorem.paragraph(), thread_timestamp: knex.fn.now(), thread_type: 'Mentorship' },
      { thread_author: 6, thread_title: 'Title!', thread_content: faker.lorem.paragraph(), thread_timestamp: knex.fn.now(), thread_type: 'Mentorship' },
      { thread_author: 4, thread_title: 'Title!', thread_content: faker.lorem.paragraph(), thread_timestamp: knex.fn.now(), thread_type: 'Mentorship' },
    ]);
  }
  if (process.env.NODE_ENV !== 'production') await genData();

};