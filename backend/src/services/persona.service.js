import { pool } from "../db.js";

class PersonaService {
  async getPersonas() {
    const [rows] = await pool.query("SELECT * FROM persona");
    return rows;
  }
  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM persona WHERE id = ?", [id]);

    if (rows.length <= 0) {
      return null;
    }

    return rows[0];
  }

  // async create(persona) {
  //   const { nombre, documento, correo, telefono } = persona;

  //   const [result] = await pool.query(
  //     "INSERT INTO persona (nombre, email, password) VALUES (?, ?, ?)",
  //     [nombre, email, password]
  //   );

  //   return {
  //     id: result.insertId,
  //     nombre,
  //     email,
  //   };
  // }

  async createPersona(persona) {
    const { nombre, documento, correo, telefono } = persona;

    const [result] = await pool.query(
      "INSERT INTO persona (`nombrecompleto`,`nrodocumento`,`correo`,`telefono`) VALUES (?,?,?,?)",
      [nombre, documento, correo, telefono]
    );

    return {
      id: result.insertId,
      nombre,
      documento,
      correo,
      telefono,
    };
  }

  async updatePersona(id, persona) {
    const { nombre, documento, correo, telefono } = persona;

    const [result] = await pool.query(
      "UPDATE persona SET nombrecompleto = IFNULL(?, nombrecompleto), nrodocumento = IFNULL(?, nrodocumento), correo = IFNULL(?, correo), telefono = IFNULL(?, telefono) WHERE id = ?",
      [nombre, documento, correo, telefono, id]
    );

    if (result.affectedRows <= 0) {
      return null;
    }

    return {
      id,
      nombre,
      documento,
      correo,
      telefono,
    };
  }

  async deletePersona(id) {
    const [result] = await pool.query("DELETE FROM persona WHERE id = ?", [id]);

    if (result.affectedRows <= 0) {
      return null;
    }

    return {
      id,
    };
  }
}

export default new PersonaService();
