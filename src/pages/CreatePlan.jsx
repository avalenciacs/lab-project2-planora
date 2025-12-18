import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createPlan } from "../services/plans.service";

const ACTIVITY_TYPES = [
  "experience",
  "culture",
  "nature",
  "food",
  "nightlife",
];

function CreatePlan() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    country: "",
    city: "",
    coverImg: "",
    description: "",
  });

  const [activities, setActivities] = useState([]);

  /* ================= FORM ================= */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ================= ACTIVITIES ================= */
  const addActivity = () =>
    setActivities([
      ...activities,
      { type: "experience", title: "", description: "", img: "" },
    ]);

  const updateActivity = (i, field, value) => {
    const copy = [...activities];
    copy[i][field] = value;
    setActivities(copy);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in");
      return;
    }

    // ✅ VALIDATION
    for (const act of activities) {
      if (!act.title || !act.description) {
        alert("All places must have a name and description");
        return;
      }
    }

    const actividades = {};
    activities.forEach((a, i) => {
      actividades[`a${i + 1}`] = {
        type: a.type,
        title: a.title,
        description: a.description,
        ...(a.img && { img: a.img }),
      };
    });

    const newPlan = {
      ...form,
      actividades,
      authorId: user.uid,
      authorName: user.displayName,
      createdAt: Date.now(),
    };

    const id = await createPlan(newPlan);
    navigate(`/plans/${id}`);
  };

  /* ================= UI ================= */
  return (
    <div className="container my-5">
      <h1>Create a new plan</h1>

      <form onSubmit={handleSubmit}>
        {/* PLAN INFO */}
        <input
          className="form-control mb-3"
          name="name"
          placeholder="Plan name (e.g. Weekend in Málaga)"
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="country"
          placeholder="Country"
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="city"
          placeholder="City"
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="coverImg"
          placeholder="Cover image URL"
          onChange={handleChange}
          required
        />

        <textarea
          className="form-control mb-4"
          name="description"
          rows="4"
          placeholder="Describe the trip and what makes it special"
          onChange={handleChange}
          required
        />

        <hr />

        {/* ACTIVITIES */}
        <h4 className="mb-2">Places to visit</h4>
        <p className="text-muted mb-3">
          Add specific places, restaurants or experiences you recommend.
        </p>

        {activities.map((a, i) => (
          <div key={i} className="border rounded p-3 mb-3">
            <strong>Place #{i + 1}</strong>

            <select
              className="form-select my-2"
              value={a.type}
              onChange={(e) => updateActivity(i, "type", e.target.value)}
            >
              {ACTIVITY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <input
              className="form-control mb-2"
              placeholder="Place or activity name (e.g. Museo Picasso, Restaurante El Pimpi)"
              value={a.title}
              onChange={(e) => updateActivity(i, "title", e.target.value)}
              required
            />

            <textarea
              className="form-control mb-2"
              placeholder="Why is this place worth visiting?"
              value={a.description}
              onChange={(e) =>
                updateActivity(i, "description", e.target.value)
              }
              required
            />

            <input
              className="form-control"
              placeholder="Image URL (optional – photo of the place)"
              value={a.img}
              onChange={(e) => updateActivity(i, "img", e.target.value)}
            />

            {a.img && (
              <img
                src={a.img}
                alt="preview"
                className="img-fluid mt-2 rounded"
              />
            )}
          </div>
        ))}

        <button
          type="button"
          className="btn btn-outline-secondary mb-3"
          onClick={addActivity}
        >
          + Add place
        </button>

        <button className="btn btn-dark w-100">
          Create plan
        </button>
      </form>
    </div>
  );
}

export default CreatePlan;
