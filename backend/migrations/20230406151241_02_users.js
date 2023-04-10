/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('username', 25);
    table.string('password');
    table.string('email');
    table.string('branch');
    table.string('full_name');
    table.integer('age_group');
    table.foreign('age_group').references('age_groups.id');
    table.string('gender');
    table.boolean('isAnonymous');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
