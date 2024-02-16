import axios from "axios";
import { API_URL } from "../config";

export const getPersonas = async () => {
  const response = await axios.get(API_URL + "personas/");
  return response.data;
};

export const getPersonaById = async (id) => {
  const response = await axios.get(API_URL + "personas/" + id);
  return response.data;
};
