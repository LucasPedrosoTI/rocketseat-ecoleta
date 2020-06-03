import Knex from "knex";

export async function seed(knex: Knex) {
  await knex("items").insert([
    { titulo: "Lâmpadas", img: "lampadas.svg" },
    { titulo: "Pilhas e Baterias", img: "baterias.svg" },
    { titulo: "Papéis e Papelão", img: "papeis-papelao.svg" },
    { titulo: "Resíduos Eletrônicos", img: "eletronicos.svg" },
    { titulo: "Resíduos Orgânicos", img: "organicos.svg" },
    { titulo: "Óleo de Cozinha", img: "oelo.svg" },
  ]);
}
