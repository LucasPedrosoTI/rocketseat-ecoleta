import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("ponto_items", (table) => {
    table.increments("id").primary();
    table
      .integer("pt_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("pontos");
    table
      .integer("it_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("items");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("ponto_items");
}
