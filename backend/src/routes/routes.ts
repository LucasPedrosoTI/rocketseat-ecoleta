import { Router } from "express";
import multer from "multer";
import multerConfig from "../config/multer";
import { celebrate, Joi } from "celebrate";

import ItemController from "../controllers/ItemController";
import PontoController from "../controllers/PontoController";

const router = Router();
const upload = multer(multerConfig);

router.get("/items", ItemController.index);
router.get("/pontos", PontoController.index);
router.get("/pontos/:id", PontoController.show);

router.post(
  "/pontos",
  upload.single("img"),
  celebrate({
    body: Joi.object().keys({
      nome: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      cidade: Joi.string().required(),
      uf: Joi.string().required(),
    }),
  }),
  PontoController.create
);

export default router;
