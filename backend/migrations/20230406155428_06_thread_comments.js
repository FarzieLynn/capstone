/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('thread_comments', table => {
    table.increments('id');
    table.integer('thread_id');
    table.foreign('thread_id').references('threads.id');
    table.integer('comment_author');
    table.foreign('comment_author').references('users.id');
    table.text('comment_content');
    table.timestamp('comment_timestamp');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('thread_comments');
};