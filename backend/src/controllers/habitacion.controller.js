import boom from "@hapi/boom";

import habitacionService from "../services/habitacion.service.js";
import handleError from "../utils/handleError.js";

export const geHabitacionById = async (req, res) => {
  try {
    const habitacion = await habitacionService.findById(req.params.id);

    if (!habitacion) {
      throw boom.notFound("Habitación no encontrada");
    }

    res.json(habitacion);
  } catch (error) {
    handleError(error, res);
  }
};

export const getHabitaciones = async (req, res) => {
  try {
    const habitaciones = await habitacionService.getHabitaciones();
    res.json(habitaciones);
  } catch (error) {
    handleError(error, res);
  }
};

export const createHabitacion = async (req, res) => {
  try {
    const habitacion = await habitacionService.createHabitacion(req.body);
    res.status(201).json(habitacion);
  } catch (error) {
    handleError(error, res);
  }
};

export const updateHabitacion = async (req, res) => {
  try {
    const { id } = req.params;
    const habitacion = await habitacionService.updateHabitacion(id, req.body);

    if (!habitacion) {
      return res.status(404).json({ message: "Habitación no encontrada" });
    }

    res.json(habitacion);
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteHabitacion = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedHabitacion = await habitacionService.deleteHabitacion(id);

    if (!deletedHabitacion) {
      return res.status(404).json({ message: "Habitación no encontrada" });
    }

    res.json(deletedHabitacion);
  } catch (error) {
    handleError(error, res);
  }
};
