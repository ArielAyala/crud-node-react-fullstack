import mysql from "mysql2/promise";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PORT,
  DB_PASSWORD,
  DB_USER,
} from "./config.js";

export const pool = mysql.createPool(
  `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`
);
