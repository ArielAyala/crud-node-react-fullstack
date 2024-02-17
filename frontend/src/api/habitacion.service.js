import axios from "axios";
import { API_URL } from "../config";

const URL_ENTITY = API_URL + "habitacion/";

export const getAllHabitaciones = async () => {
  const response = await axios.get(URL_ENTITY);
  return response.data;
};

export const getHabitacionById = async (id) => {
  const response = await axios.get(URL_ENTITY + id);
  return response.data;
};

export const createHabitacion = async (habitacion) => {
  try {
    const response = await axios.post(URL_ENTITY, habitacion);

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Error creating habitacion: " + response.statusText);
    }
  } catch (error) {
    console.error("Error creating habitacion:", error);
    throw error;
  }
};

export const updateHabitacion = async (id, habitacionData) => {
  try {
    const response = await axios.patch(URL_ENTITY + id, habitacionData);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error updating habitacion: " + response.statusText);
    }
  } catch (error) {
    console.error("Error updating habitacion:", error);
    throw error;
  }
};

export const deleteHabitacion = async (id) => {
  try {
    const response = await axios.delete(URL_ENTITY + id);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error deleting habitacion: " + response.statusText);
    }
  } catch (error) {
    console.error("Error deleting habitacion:", error);
    throw error;
  }
};
