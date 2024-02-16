import axios from "axios";
import { API_URL } from "../config";

const URL_ENTITY = API_URL + "personas/";

export const getAllPersonas = async () => {
  const response = await axios.get(URL_ENTITY);
  return response.data;
};

export const getPersonaById = async (id) => {
  const response = await axios.get(URL_ENTITY + id);
  return response.data;
};

export const createPersona = async (persona) => {
  try {
    const response = await axios.post(URL_ENTITY, persona);

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Error creating persona: " + response.statusText);
    }
  } catch (error) {
    console.error("Error creating persona:", error);
    throw error;
  }
};
