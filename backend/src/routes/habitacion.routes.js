import { Router } from "express";
import {
  geHabitacionById,
  getHabitaciones,
  createHabitacion,
  updateHabitacion,
  deleteHabitacion,
} from "../controllers/habitacion.controller.js";

const router = Router();

router.get("/habitaciones/:id", geHabitacionById);
router.get("/habitaciones", getHabitaciones);
router.post("/habitaciones", createHabitacion);
router.patch("/habitaciones/:id", updateHabitacion);
router.delete("/habitaciones/:id", deleteHabitacion);

export default router;
