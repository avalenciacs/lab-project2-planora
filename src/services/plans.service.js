import { db } from "../config/firebase";
import { ref, get, push, update, remove } from "firebase/database";

/* ================= GET ALL ================= */
export const getAllPlans = async () => {
  const snapshot = await get(ref(db, "places"));
  if (!snapshot.exists()) return [];

  return Object.entries(snapshot.val()).map(([id, plan]) => ({
    id,
    ...plan,
  }));
};

/* ================= GET BY ID ================= */
export const getPlanById = async (id) => {
  const snapshot = await get(ref(db, `places/${id}`));
  return snapshot.exists() ? snapshot.val() : null;
};

/* ================= CREATE ================= */
export const createPlan = async (planData) => {
  const newRef = push(ref(db, "places"));

  // 🔴 IMPORTANTE: inicializamos likes vacío
  await update(newRef, {
    ...planData,
    likes: {},
  });

  return newRef.key;
};

/* ================= UPDATE (EDIT PLAN) ================= */
export const updatePlan = async (id, data) => {
  // ❗ NO tocamos likes aquí
  await update(ref(db, `places/${id}`), data);
};

/* ================= LIKE / UNLIKE ================= */
export const likePlan = async (planId, userId) => {
  await update(ref(db, `places/${planId}/likes`), {
    [userId]: true,
  });
};

export const unlikePlan = async (planId, userId) => {
  await remove(ref(db, `places/${planId}/likes/${userId}`));
};

/* ================= DELETE ================= */
export const deletePlan = async (id) => {
  await remove(ref(db, `places/${id}`));
};
