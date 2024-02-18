import { Router } from "express";

import {
  getReservaById,
  getReservas,
  createReseva,
  deleteReserva,
  updateReserva
} from "../controllers/reserva.controller.js";

const router = Router();

router.get("/reserva/:id", getReservaById);
router.get("/reserva", getReservas);
router.post("/reserva", createReseva);
router.patch("/reserva/:id", updateReserva);
router.delete("/reserva/:id", deleteReserva);

export default router;
