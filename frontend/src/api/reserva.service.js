import axios from "axios";
import { API_URL } from "../config";

const URL_ENTITY = API_URL + "reserva/";

export const getAllReservas = async () => {
  const response = await axios.get(URL_ENTITY);
  return response.data;
};

export const getReservaById = async (id) => {
  const response = await axios.get(URL_ENTITY + id);
  return response.data;
};

export const createReserva = async (reserva) => {
  try {
    const response = await axios.post(URL_ENTITY, reserva);
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(
        "Error creating reserva: " + response.statusText.response.data.message
      );
    }
  } catch (error) {
    console.error("Error creating reserva:", error);
    throw error;
  }
};

export const updateReserva = async (id, reservaData) => {
  try {
    const response = await axios.patch(URL_ENTITY + id, reservaData);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error updating reserva: " + response.statusText);
    }
  } catch (error) {
    console.error("Error updating reserva:", error);
    throw error;
  }
};

export const deleteReserva = async (id) => {
  try {
    const response = await axios.delete(URL_ENTITY + id);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error deleting reserva: " + response.statusText);
    }
  } catch (error) {
    console.error("Error deleting reserva:", error);
    throw error;
  }
};
