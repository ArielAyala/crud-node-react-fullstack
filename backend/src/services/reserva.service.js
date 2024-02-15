import Joi from "joi";
import boom from "@hapi/boom";
import { differenceInDays } from "date-fns";

import { pool } from "../db.js";
import habitacionService from "./habitacion.service.js";

const SELECT_RESERVAS_BASE = `select r.id,
                                      r.fechareserva,
                                      r.fechaentrada,
                                      r.fechasalida,
                                      r.personaid,
                                      p.nombrecompleto,
                                      r.habitacionid, 
                                      h.habitacionnro,
                                      r.montoreserva
                                          
                                      from mydb.reserva r
                                      inner join mydb.persona p 
                                      on r.personaid = p.id 
                                      inner join mydb.habitacion h 
                                      on  r.habitacionid = h.id `;

const PRICE_PER_DAY = 120000;

class ReservaService {
  async getReservas() {
    const [rows] = await pool.query(SELECT_RESERVAS_BASE);
    return rows;
  }

  async getReservaById(id) {
    const query = `${SELECT_RESERVAS_BASE} WHERE r.id = ?`;
    const [rows] = await pool.query(query, [id]);

    if (rows.length <= 0) {
      return null;
    }

    return rows[0];
  }

  async createReserva(reserva) {
    const schema = Joi.object({
      fechaEntrada: Joi.date().min(new Date()).required(),
      fechaSalida: Joi.date().greater(Joi.ref("fechaEntrada")),
      personaId: Joi.number().required(),
      habitacionid: Joi.number().required(),
    });

    const { error } = schema.validate(reserva);

    if (error) {
      throw boom.badRequest(error.details[0].message);
    }

    // prettier-ignore
    const isHabitacionAvailable = await habitacionService.isHabitacionDisponible(reserva.habitacionid,reserva.fechaEntrada,reserva.fechaSalida);

    console.log("isHabitacionAvailable", isHabitacionAvailable);
    if (!isHabitacionAvailable) {
      throw boom.badRequest("Habitación no disponible");
    }

    // prettier-ignore
    reserva.montoReserva = this.calcularDiferenciaEnDiasConDateFns(reserva.fechaEntrada,reserva.fechaSalida);

    return reserva;
  }

  calcularDiferenciaEnDiasConDateFns(fechaEntrada, fechaSalida) {
    const days = differenceInDays(fechaSalida, fechaEntrada);
    return days * PRICE_PER_DAY;
  }
}

export default new ReservaService();
