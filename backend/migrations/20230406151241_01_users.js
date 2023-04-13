/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('username', 25).notNullable();
    table.string('password').notNullable();
    table.string('email');
    table.string('branch').notNullable();
    table.string('current_status');
    table.string('full_name').notNullable();
    table.string('age_group');
    table.string('gender');
    table.string('education_level');
    table.string('phone_number');
    table.text('about_you');
    table.jsonb('personal_goals');
    table.boolean('is_professional');
    table.boolean('is_verified');
    table.boolean('is_anonymous');
    table.string('anon_username');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
