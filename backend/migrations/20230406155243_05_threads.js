/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('threads', table => {
    table.increments('id').primary();
    table.text('thread_type');
    table.text('thread_content');
    table.integer('thread_author');
    table.foreign('thread_author').references('users.id');
    table.timestamp('thread_timestamp');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('threads');
};