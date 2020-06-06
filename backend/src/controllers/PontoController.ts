import { Request, Response } from "express";
import knex from "../database/connection";

export default {
  index: async (req: Request, res: Response) => {
    let { cidade, uf, items } = req.query;

    items = items || "1,2,3,4,5,6";

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    console.log(parsedItems);
    console.log(uf);
    console.log(cidade);

    const pontos = await knex("pontos")
      .join("ponto_items", "pontos.id", "=", "ponto_items.pt_id")
      .whereIn("ponto_items.it_id", parsedItems)
      .where("cidade", String(cidade).trim())
      .where("uf", String(uf))
      .distinct()
      .select("pontos.*");

    const serializedPoints = pontos.map((ponto) => {
      return {
        ...ponto,
        img_url: `http://192.168.1.101:3333/uploads/${ponto.img}`,
      };
    });

    return res.json(serializedPoints);
  },
  show: async (req: Request, res: Response) => {
    const { id } = req.params;

    const ponto = await knex("pontos").where("id", id).first();

    if (!ponto) {
      return res.status(400).json({ msg: "Point not found" });
    }

    const serializedPoint = {
      ...ponto,
      img_url: `http://192.168.1.101:3333/uploads/${ponto.img}`,
    };

    const items = await knex("items")
      .join("ponto_items", "items.id", "=", "ponto_items.it_id")
      .where("ponto_items.pt_id", id)
      .select("items.titulo");

    return res.json({ ponto: serializedPoint, items });
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
      img: req.file.filename,
      nome,
      email,
      whatsapp,
      latitude,
      longitude,
      cidade,
      uf,
    };

    const [pt_id] = await trx("pontos").insert(point);

    const pointItems = items
      .split(",")
      .map((item: string) => Number(item.trim()))
      .map((it_id: number) => {
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
