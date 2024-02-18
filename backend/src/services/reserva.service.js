import Joi from "joi";
import boom from "@hapi/boom";
import { differenceInDays } from "date-fns";

import { pool } from "../db.js";
import habitacionService from "./habitacion.service.js";
import { PRICE_PER_DAY } from "../config.js";

const SELECT_RESERVAS_BASE = `select    r.id,
                                        r.fechareserva,
                                        r.fechaentrada,
                                        r.fechasalida,
                                        r.personaid,
                                        p.nombrecompleto,
                                        r.habitacionid, 
                                        h.habitacionnro,
                                        h.habitacionpiso,
                                        r.montoreserva
                                      from mydb.reserva r
                                      inner join mydb.persona p 
                                        on r.personaid = p.id 
                                      inner join mydb.habitacion h 
                                        on  r.habitacionid = h.id `;

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
      habitacionId: Joi.number().required(),
    });

    const { error } = schema.validate(reserva);

    if (error) {
      throw boom.badRequest(error.details[0].message);
    }

    // prettier-ignore
    const isHabitacionAvailable = await habitacionService.isHabitacionDisponible(reserva.habitacionId,reserva.fechaEntrada,reserva.fechaSalida);
    if (!isHabitacionAvailable) {
      throw boom.badRequest("Habitación no disponible");
    }

    // prettier-ignore
    reserva.montoReserva = this.calculateMontoReserva(reserva.fechaEntrada,reserva.fechaSalida);

    // prettier-ignore
    const { fechaEntrada, fechaSalida, habitacionId, personaId, montoReserva } = reserva;
    // prettier-ignore
    const [result] = await pool.query(`INSERT INTO reserva (fechareserva,fechaentrada,fechasalida,habitacionid,personaid,montoreserva) 
                                        VALUES(now(),?,?,?,?,?);`, [fechaEntrada, fechaSalida, habitacionId, personaId, montoReserva]);

    return {
      id: result.insertId,
      fechaEntrada,
      fechaSalida,
      habitacionId,
      personaId,
      montoReserva,
    };
  }

  calculateMontoReserva(fechaEntrada, fechaSalida) {
    const days = differenceInDays(fechaSalida, fechaEntrada);
    return days * PRICE_PER_DAY;
  }

  async deleteReserva(id) {
    const [result] = await pool.query("DELETE FROM reserva WHERE id = ?", [id]);

    if (result.affectedRows <= 0) {
      return null;
    }

    return {
      id,
    };
  }
}

export default new ReservaService();
