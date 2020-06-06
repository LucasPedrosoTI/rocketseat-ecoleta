import { Router } from "express";
import multer from "multer";
import multerConfig from "../config/multer";
import { celebrate } from "celebrate";

import ItemController from "../controllers/ItemController";
import PontoController from "../controllers/PontoController";

import pontoSchema from "../utils/schema";

const router = Router();
const upload = multer(multerConfig);

router.get("/items", ItemController.index);
router.get("/pontos", PontoController.index);
router.get("/pontos/:id", PontoController.show);

router.post(
  "/pontos",
  upload.single("img"),
  celebrate(
    {
      body: pontoSchema,
    },
    {
      abortEarly: false,
    }
  ),
  PontoController.create
);

export default router;
