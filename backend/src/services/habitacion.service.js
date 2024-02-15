import Joi from "joi";
import boom from "@hapi/boom";
import { pool } from "../db.js";
//import JoiValidationError from "../utils/joiValidationError.js";

class HabitacionService {
  async getHabitaciones() {
    const [rows] = await pool.query("SELECT * FROM habitacion");
    return rows;
  }
  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM habitacion WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return null;
    }

    return rows[0];
  }

  async createHabitacion(habitacion) {
    const schema = Joi.object({
      habitacionPiso: Joi.number().integer().min(1).max(10).required(),
      habitacionNro: Joi.number().integer().min(1).max(20).required(),
      cantCamas: Joi.number().integer().min(1).max(20).required(),
      tieneTelevision: Joi.boolean().required(),
      tieneFrigobar: Joi.boolean().required(),
    });

    const { error } = schema.validate(habitacion);

    if (error) {
      //throw new JoiValidationError(error.details[0].message);
      throw boom.badRequest(error.details[0].message);
    }

    const {
      habitacionPiso,
      habitacionNro,
      cantCamas,
      tieneTelevision,
      tieneFrigobar,
    } = habitacion;

    const [result] = await pool.query(
      "INSERT INTO habitacion (`habitacionpiso`,`habitacionnro`,`cantcamas`,`tienetelevision`, `tienefrigobar`) VALUES (?,?,?,?,?)",
      [habitacionPiso, habitacionNro, cantCamas, tieneTelevision, tieneFrigobar]
    );

    return {
      id: result.insertId,
      habitacionPiso,
      habitacionNro,
      cantCamas,
      tieneTelevision,
      tieneFrigobar,
    };
  }

  async updateHabitacion(id, habitacion) {
    const {
      habitacionPiso,
      habitacionNro,
      cantCamas,
      tieneTelevision,
      tieneFrigobar,
    } = habitacion;

    const updateQuery = `UPDATE habitacion 
                        SET habitacionpiso = IFNULL(?, habitacionpiso),
                            habitacionnro = IFNULL(?, habitacionnro),
                            cantcamas = IFNULL(?, cantcamas),
                            tienetelevision = IFNULL(?, tienetelevision),
                            tienefrigobar = IFNULL(?, tienefrigobar)
                        WHERE id = ?`;

    const [result] = await pool.query(updateQuery, [
      habitacionPiso,
      habitacionNro,
      cantCamas,
      tieneTelevision,
      tieneFrigobar,
      id,
    ]);

    if (result.affectedRows <= 0) {
      return null;
    }

    return {
      id,
      habitacionPiso,
      habitacionNro,
      cantCamas,
      tieneTelevision,
      tieneFrigobar,
    };
  }

  async deleteHabitacion(id) {
    const [result] = await pool.query("DELETE FROM habitacion WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows <= 0) {
      return null;
    }

    return {
      id,
    };
  }
}

export default new HabitacionService();
