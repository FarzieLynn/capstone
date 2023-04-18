/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('test_scores').del()
  await knex('test_scores').insert([
    {user_id: 3, score: 20},
    {user_id: 3, score: 19},
    {user_id: 3, score: 16}
  ]);
};
