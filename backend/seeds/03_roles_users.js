/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  
  await knex('role_users').insert([
    {user_id: 6, role_id:3},
    {user_id:1, role_id:1}
  ]);
};