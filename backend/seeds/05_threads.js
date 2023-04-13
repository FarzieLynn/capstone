/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { faker} = require("@faker-js/faker");

exports.seed = async function(knex) {
  await knex('threads').insert([
    {thread_author: 3, thread_title:'Title!', thread_content: faker.lorem.paragraph(), thread_timestamp:knex.fn.now(), thread_type:'Mentorship'},
    {thread_author: 6, thread_title:'Title!', thread_content: faker.lorem.paragraph(), thread_timestamp:knex.fn.now(), thread_type:'Mentorship'},
    {thread_author: 8, thread_title:'Title!', thread_content: faker.lorem.paragraph(), thread_timestamp:knex.fn.now(), thread_type:'Mentorship'},
  ]);
};