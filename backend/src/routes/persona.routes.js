import { Router } from "express";
import {
  getPersonas,
  createPersona,
  updatePersona,
  deletePersona,
  getPersonaById,
} from "../controllers/persona.controller.js";

const router = Router();

router.get("/personas/:id", getPersonaById);
router.get("/personas", getPersonas);
router.post("/personas", createPersona);
router.patch("/personas/:id", updatePersona);
router.delete("/personas/:id", deletePersona);

export default router;
