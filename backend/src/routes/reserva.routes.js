import { Router } from "express";

import {
  getReservaById,
  getReservas,
  createReseva,
} from "../controllers/reserva.controller.js";

const router = Router();

router.get("/reservas/:id", getReservaById);
router.get("/reservas", getReservas);
router.post("/reservas", createReseva);

export default router;
