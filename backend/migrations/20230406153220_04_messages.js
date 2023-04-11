/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('messages', table => {
    table.increments('id').primary();
    table.integer('user_id_1');
    table.foreign('user_id_1').references('users.id')
      .onDelete('CASCADE');
    table.integer('user_id_2');
    table.foreign('user_id_2').references('users.id')
      .onDelete('CASCADE');
    table.text('message_content');
    table.timestamp('message_timestamp');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('messages');
};
