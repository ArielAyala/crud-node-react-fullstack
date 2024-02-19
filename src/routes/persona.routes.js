import { Router } from "express";
import {
  getPersonas,
  createPersona,
  updatePersona,
  deletePersona,
  getPersonaById,
} from "../controllers/persona.controller.js";

const router = Router();

router.get("/persona/:id", getPersonaById);
router.get("/persona", getPersonas);
router.post("/persona", createPersona);
router.patch("/persona/:id", updatePersona);
router.delete("/persona/:id", deletePersona);

export default router;
