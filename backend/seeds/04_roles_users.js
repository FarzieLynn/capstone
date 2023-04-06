/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  
  await knex('role_users').insert([
    {user_id: 6, role_id:3},
    {user_id: 15, role_id:2},
    {user_id: 14, role_id:6},
    {user_id: 12, role_id:6},
    {user_id: 17, role_id:6},
    {user_id: 11, role_id:5},
  ]);
};