import axios from "axios";

const BASE_URL =
  "https://planora-a08d1-default-rtdb.europe-west1.firebasedatabase.app";

export const getPlaces = async () => {
  const response = await axios.get(`${BASE_URL}/places.json`);
  return response.data; // OJO: objeto, no array
};