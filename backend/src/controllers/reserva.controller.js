import boom from "@hapi/boom";

import reservaService from "../services/reserva.service.js";
import handleError from "../utils/handleError.js";

export const getReservaById = async (req, res) => {
  try {
    const reserva = await reservaService.getReservaById(req.params.id);

    if (!reserva) {
      throw boom.notFound("Reserva no encontrada");
    }

    res.json(reserva);
  } catch (error) {
    handleError(error, res);
  }
};

export const getReservas = async (req, res) => {
  try {
    const reservas = await reservaService.getReservas();
    res.json(reservas);
  } catch (error) {
    handleError(error, res);
  }
};

export const createReseva = async (req, res) => {
  try {
    const reserva = await reservaService.createReserva(req.body);

    res.status(201).json(reserva);
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteReserva = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReserva = await reservaService.deleteReserva(id);

    if (!deletedReserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    res.json(deletedReserva);
  } catch (error) {
    handleError(error, res);
  }
};
