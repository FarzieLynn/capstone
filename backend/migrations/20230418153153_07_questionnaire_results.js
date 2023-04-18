/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('questionnaire_results', table => {
    table.increments('id').primary;
    table.text('type');
    table.integer('user');
    table.foreign('user').references('users.id').onDelete('CASCADE');
    table.integer('score');
    table.timestamp('timestamp');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('questionnaire_results');
};
