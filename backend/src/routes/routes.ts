import { Router } from "express";
import ItemController from "../controllers/ItemController";
import PontoController from "../controllers/PontoController";

const router = Router();

router.get("/items", ItemController.index);

router.post("/pontos", PontoController.create);
router.get("/pontos", PontoController.index);
router.get("/pontos/:id", PontoController.show);

export default router;
