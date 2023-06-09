/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('threads', table => {
    table.increments('id').primary();
    table.string('thread_title');
    table.string('thread_type');
    table.text('thread_content');
    table.integer('thread_author');
    table.foreign('thread_author').references('users.id')
      .onDelete('CASCADE');
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