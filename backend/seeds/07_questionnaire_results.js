/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('questionnaire_results').del()
  await knex('questionnaire_results').insert([
    {type:'Mental Health', user: 3, score:30, timestamp:knex.fn.now()},
    {type:'Mental Health', user: 3, score:28, timestamp:knex.fn.now()},
    {type:'Mental Health', user: 3, score:24, timestamp:knex.fn.now()},
  ]);
};
