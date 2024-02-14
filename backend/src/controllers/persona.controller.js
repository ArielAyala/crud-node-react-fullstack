import { pool } from "../db.js";

export const getPersonaById = async (req, res) => {
  try {
    const [rows] = await pool.query("select * from persona where id = ?", [
      req.params.id,
    ]);
    if (rows.length <= 0)
      return res.status(404).json({
        messaje: "Persona no encontrada",
      });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const getPersonas = async (req, res) => {
  try {
    const [rows] = await pool.query("select * from persona");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const createPersona = async (req, res) => {
  try {
    const { nombre, documento, correo, telefono } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO persona (`nombrecompleto`,`nrodocumento`,`correo`,`telefono`) VALUES (?,?,?,?)",
      [nombre, documento, correo, telefono]
    );

    res.send({ id: rows.insertId, nombre, documento, correo, telefono });
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const updatePersona = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, documento, correo, telefono } = req.body;

    const [result] = await pool.query(
      "UPDATE persona SET nombrecompleto = IFNULL(?, nombrecompleto), nrodocumento = IFNULL(?, nrodocumento), correo = IFNULL(?, correo), telefono = IFNULL(?, telefono) WHERE id = ?",
      [nombre, documento, correo, telefono, id]
    );

    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Persona no encontrada",
      });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const deletePersona = async (req, res) => {
  const [result] = await pool.query("DELETE FROM persona WHERE id = ?", [
    req.params.id,
  ]);

  if (result.affectedRows <= 0)
    return res.status(404).json({
      message: "Persona no encontrada",
    });
  res.sendStatus(204);
};
