import { Router } from "express";
import {
  geHabitacionById,
  getHabitaciones,
  createHabitacion,
  updateHabitacion,
  deleteHabitacion,
  getHabitacionesDisponiblesByDateRange,
} from "../controllers/habitacion.controller.js";

const router = Router();

router.get("/habitacion/:id", geHabitacionById);
router.get("/habitacion", getHabitaciones);
// prettier-ignore
router.get("/habitacion/habitaciones-disponibles/:fechaEntrada/:fechaSalida",getHabitacionesDisponiblesByDateRange);
router.post("/habitacion", createHabitacion);
router.patch("/habitacion/:id", updateHabitacion);
router.delete("/habitacion/:id", deleteHabitacion);

export default router;
