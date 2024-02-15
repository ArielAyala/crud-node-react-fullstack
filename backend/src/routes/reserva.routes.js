import { Router } from "express";

import {
  getReservaById,
  getReservas,
  createReseva,
  deleteReserva
} from "../controllers/reserva.controller.js";

const router = Router();

router.get("/reservas/:id", getReservaById);
router.get("/reservas", getReservas);
router.post("/reservas", createReseva);
router.delete("/reservas/:id", deleteReserva);

export default router;
