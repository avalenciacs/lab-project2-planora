import { db } from "../config/firebase";
import {
  ref,
  get,
  push,
  update,
  remove,
  query,
  orderByChild,
  limitToLast,
} from "firebase/database";

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

  await update(newRef, {
    ...planData,
    likes: {},
    likesCount: 0, // 🔥 CLAVE PARA TOP PLANS
  });

  return newRef.key;
};

/* ================= UPDATE (EDIT PLAN) ================= */
export const updatePlan = async (id, data) => {
  // ❗ NO tocamos likes ni likesCount aquí
  await update(ref(db, `places/${id}`), data);
};

/* ================= LIKE ================= */
export const likePlan = async (planId, userId) => {
  const planRef = ref(db, `places/${planId}`);
  const snapshot = await get(planRef);

  if (!snapshot.exists()) return;

  const plan = snapshot.val();
  const likesCount = plan.likesCount || 0;

  await update(planRef, {
    [`likes/${userId}`]: true,
    likesCount: likesCount + 1,
  });
};

/* ================= UNLIKE ================= */
export const unlikePlan = async (planId, userId) => {
  const planRef = ref(db, `places/${planId}`);
  const snapshot = await get(planRef);

  if (!snapshot.exists()) return;

  const plan = snapshot.val();
  const likesCount = Math.max((plan.likesCount || 1) - 1, 0);

  await update(planRef, {
    likesCount,
  });

  await remove(ref(db, `places/${planId}/likes/${userId}`));
};

/* ================= TOP PLANS ================= */
export const getTopPlans = async () => {
  const q = query(
    ref(db, "places"),
    orderByChild("likesCount"),
    limitToLast(9)
  );

  const snapshot = await get(q);
  if (!snapshot.exists()) return [];

  // 🔥 reverse → el más liked primero
  return Object.entries(snapshot.val())
    .map(([id, plan]) => ({ id, ...plan }))
    .reverse();
};

/* ================= DELETE ================= */
export const deletePlan = async (id) => {
  await remove(ref(db, `places/${id}`));
};
