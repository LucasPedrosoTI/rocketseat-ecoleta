import { Request, Response } from "express";
import knex from "../database/connection";

export default {
  index: async (req: Request, res: Response) => {
    const { cidade, uf, items } = req.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const pontos = await knex("pontos")
      .join("ponto_items", "pontos.id", "=", "ponto_items.pt_id")
      .whereIn("ponto_items.it_id", parsedItems)
      .where("cidade", String(cidade))
      .where("uf", String(uf))
      .distinct()
      .select("pontos.*");

    return res.json(pontos);
  },
  show: async (req: Request, res: Response) => {
    const { id } = req.params;

    const ponto = await knex("pontos").where("id", id).first();

    if (!ponto) {
      return res.status(400).json({ msg: "Point not found" });
    }

    const items = await knex("items")
      .join("ponto_items", "items.id", "=", "ponto_items.it_id")
      .where("ponto_items.pt_id", id)
      .select("items.titulo");

    return res.json({ ponto, items });
  },
  create: async (req: Request, res: Response) => {
    const {
      nome,
      email,
      whatsapp,
      latitude,
      longitude,
      cidade,
      uf,
      items,
    } = req.body;

    const trx = await knex.transaction();

    const point = {
      img:
        "https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
      nome,
      email,
      whatsapp,
      latitude,
      longitude,
      cidade,
      uf,
    };

    const [pt_id] = await trx("pontos").insert(point);

    const pointItems = items.map((it_id: number) => {
      return {
        it_id,
        pt_id,
      };
    });

    await trx("ponto_items").insert(pointItems);

    await trx.commit();

    return res.json({
      id: pt_id,
      ...point,
    });
  },
};
