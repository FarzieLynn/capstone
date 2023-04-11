/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('role_users', table => {
    table.integer('user_id');
    table.foreign('user_id').references('users.id');
    table.integer('role_id');
    table.foreign('role_id').references('roles.id');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('role_users');
};
