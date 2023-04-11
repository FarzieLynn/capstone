/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const roles = [
  {id:1,role_name:'Admin'},
  {id:2,role_name:'Fitness Trainer'},
  {id:3,role_name:'Chaplain'},
  {id:4,role_name:'Financial Specialist'},
  {id:5,role_name:'Mentor'},
  {id:6,role_name:'User'},
]
exports.seed = async function(knex) {
  await knex('roles').del()
  await knex('roles').insert(roles);
};
