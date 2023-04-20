/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */



exports.seed = async function (knex) {
  // Deletes ALL existing entries
  

  const genData = async () => {
    const { faker } = require("@faker-js/faker");
    await knex('messages').insert([
      { id: 1, user_id_1: 3, user_id_2: 5, message_content: faker.lorem.paragraph(), message_timestamp: knex.fn.now() },
      { id: 2, user_id_1: 3, user_id_2: 5, message_content: faker.lorem.paragraph(), message_timestamp: knex.fn.now() },
      { id: 3, user_id_1: 3, user_id_2: 5, message_content: faker.lorem.paragraph(), message_timestamp: knex.fn.now() },
    ]);
  }
  if (process.env.NODE_ENV !== 'production') await genData();
};
