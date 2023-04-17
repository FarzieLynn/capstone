/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  
  await knex('role_users').insert([
    {user_id: 6, role_id:3},
    {user_id:1, role_id:1},
    {user_id:5, role_id:3},
    {user_id:6, role_id:2},
    {user_id:7, role_id:4},
  ]);
};