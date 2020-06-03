import Knex from "knex";

export const up = async (knex: Knex) => {
  return knex.schema.createTable("pontos", (table) => {
    table.increments("id").primary();
    table.string("img").notNullable();
    table.string("nome").notNullable();
    table.string("email").notNullable();
    table.string("whatsapp").notNullable();
    table.decimal("latitude").notNullable();
    table.decimal("longitude").notNullable();
    table.string("cidade").notNullable();
    table.string("uf", 2).notNullable();
  });
};

export const down = async (knex: Knex) => {
  return knex.schema.dropTable("pontos");
};
