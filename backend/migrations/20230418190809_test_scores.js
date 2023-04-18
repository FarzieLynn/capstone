/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("test_scores", (table) => {
    table.increments("id");
    table.integer("user_id").notNullable();
    table.foreign("user_id").references("id").inTable("users")
    .onDelete("CASCADE");
    table.integer("score").notNullable();
    table.timestamp("date_taken").defaultTo(knex.fn.now());
  }
  )
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("test_scores");
};
