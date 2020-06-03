import { Request, Response } from "express";
import knex from "../database/connection";

export default {
  index: async (req: Request, res: Response) => {
    const items = await knex("items").select("*");

    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        titulo: item.titulo,
        img_url: `http://localhost:3000/uploads/${item.img}`,
      };
    });

    return res.json(serializedItems);
  },
};