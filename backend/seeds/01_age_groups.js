/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('threads').del()
  await knex('messages').del()
  await knex('role_users').del()
  await knex("users").del();
  await knex('age_groups').del()
  await knex('age_groups').insert([
    {id: 1, age_group:'17-21'},
    {id: 2, age_group:'22-26'},
    {id: 3, age_group:'27-31'},
    {id: 4, age_group:'32-36'},
    {id: 5, age_group:'37-41'},
    {id: 6, age_group:'42-46'},
    {id: 7, age_group:'47-51'},
    {id: 8, age_group:'52-56'},
  ]);
};
