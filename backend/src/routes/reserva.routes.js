import { Router } from "express";

import {
  getReservaById,
  getReservas,
  createReseva,
  deleteReserva
} from "../controllers/reserva.controller.js";

const router = Router();

router.get("/reserva/:id", getReservaById);
router.get("/reserva", getReservas);
router.post("/reserva", createReseva);
router.delete("/reserva/:id", deleteReserva);

export default router;
