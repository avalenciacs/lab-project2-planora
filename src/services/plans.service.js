import axios from "axios";

const BASE_URL =
  "https://planora-a08d1-default-rtdb.europe-west1.firebasedatabase.app/places";

export const getAllPlans = async () => {
  const response = await axios.get(`${BASE_URL}.json`);

  if (!response.data) return [];

  return Object.entries(response.data).map(([id, plan]) => ({
    id,
    ...plan,
  }));
};

export const getPlanById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}.json`);
  return response.data;
};

export const createPlan = async (planData) => {
  const response = await axios.post(`${BASE_URL}.json`, planData);
  // Firebase RTDB devuelve { name: "generatedId" }
  return response.data.name;
};

export const updateVotes = async (id, newVotes) => {
  await axios.patch(`${BASE_URL}/${id}.json`, {
    votes: newVotes,
  });
};

export const updatePlan = async (id, data) => {
  await axios.put(`${BASE_URL}/${id}.json`, data);
};

export const deletePlan = async (id) => {
  await axios.delete(`${BASE_URL}/${id}.json`);
};

