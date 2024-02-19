import boom from "@hapi/boom";

import personaService from "../services/persona.service.js";
import handleError from "../utils/handleError.js";

export const getPersonaById = async (req, res) => {
  try {
    const persona = await personaService.getPersonaById(req.params.id);

    if (!persona) {
      throw boom.notFound("Persona no encontrada");
    }

    res.json(persona);
  } catch (error) {
    handleError(error, res);
  }
};

export const getPersonas = async (req, res) => {
  try {
    const personas = await personaService.getPersonas();
    res.json(personas);
  } catch (error) {
    handleError(error, res);
  }
};

export const createPersona = async (req, res) => {
  try {
    const { nombre, documento, correo, telefono } = req.body;

    const persona = await personaService.createPersona({
      nombre,
      documento,
      correo,
      telefono,
    });

    res.status(201).json(persona);
  } catch (error) {
    handleError(error, res);
  }
};

export const updatePersona = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, documento, correo, telefono } = req.body;

    const persona = await personaService.updatePersona(id, {
      nombre,
      documento,
      correo,
      telefono,
    });

    if (!persona) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }

    res.json(persona);
  } catch (error) {
    handleError(error, res);
  }
};

export const deletePersona = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPersona = await personaService.deletePersona(id);

    if (!deletedPersona) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }

    res.json(deletedPersona);
  } catch (error) {
    handleError(error, res);
  }
};
