import Knex from "knex";

export const up = async (knex: Knex) => {
  return knex.schema.createTable("items", (table) => {
    table.increments("id").primary();
    table.string("img").notNullable();
    table.string("titulo").notNullable();
  });
};

export const down = async (knex: Knex) => {
  return knex.schema.dropTable("items");
};
