import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getPlanById, updatePlan } from "../services/plans.service";

const ACTIVITY_TYPES = [
  "experience",
  "culture",
  "nature",
  "food",
  "nightlife",
];

function EditPlan() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    city: "",
    coverImg: "",
    description: "",
    activities: [],
  });

  const [loading, setLoading] = useState(true);

  /* ================= LOAD PLAN ================= */
  useEffect(() => {
    const loadPlan = async () => {
      const data = await getPlanById(id);

      setFormData({
        name: data.name || "",
        country: data.country || "",
        city: data.city || "",
        coverImg: data.coverImg || "",
        description: data.description || "",
        activities: data.actividades
          ? Object.entries(data.actividades).map(([key, value]) => ({
              id: key,
              ...value,
            }))
          : [],
      });

      setLoading(false);
    };

    loadPlan();
  }, [id]);

  /* ================= PLAN FIELDS ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= ACTIVITIES ================= */
  const updateActivity = (index, field, value) => {
    const updated = [...formData.activities];
    updated[index][field] = value;
    setFormData({ ...formData, activities: updated });
  };

  const addActivity = () => {
    setFormData({
      ...formData,
      activities: [
        ...formData.activities,
        {
          type: "experience",
          title: "",
          description: "",
          img: "",
        },
      ],
    });
  };

  const removeActivity = (index) => {
    const updated = [...formData.activities];
    updated.splice(index, 1);
    setFormData({ ...formData, activities: updated });
  };

  /* ================= SAVE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Not authorized");
      return;
    }

    // ✅ VALIDACIÓN
    for (const act of formData.activities) {
      if (!act.title || !act.description) {
        alert("All places must have a name and description");
        return;
      }
    }

    const actividades = {};
    formData.activities.forEach((act, index) => {
      actividades[`a${index + 1}`] = {
        type: act.type,
        title: act.title,
        description: act.description,
        ...(act.img && { img: act.img }),
      };
    });

    const updatedPlan = {
      name: formData.name,
      country: formData.country,
      city: formData.city,
      coverImg: formData.coverImg,
      description: formData.description,
      actividades,
      // ❌ NO authorId
      // ❌ NO likes
    };

    await updatePlan(id, updatedPlan);
    navigate(`/plans/${id}`);
  };

  /* ================= UI ================= */
  if (loading) {
    return <p className="text-center mt-5">Loading plan...</p>;
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">Edit Plan</h2>

      <form onSubmit={handleSubmit}>
        {/* PLAN INFO */}
        <input
          className="form-control mb-3"
          name="name"
          placeholder="Plan name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="coverImg"
          placeholder="Cover image URL"
          value={formData.coverImg}
          onChange={handleChange}
          required
        />

        <textarea
          className="form-control mb-4"
          name="description"
          placeholder="Describe the trip"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <hr />

        {/* ACTIVITIES */}
        <h4 className="mb-2">Places to visit</h4>
        <p className="text-muted mb-3">
          Edit the places, restaurants or experiences included in this plan.
        </p>

        {formData.activities.map((activity, index) => (
          <div key={activity.id || index} className="border rounded p-3 mb-3">
            <strong>Place #{index + 1}</strong>

            <select
              className="form-select my-2"
              value={activity.type}
              onChange={(e) =>
                updateActivity(index, "type", e.target.value)
              }
            >
              {ACTIVITY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <input
              className="form-control mb-2"
              placeholder="Place name (e.g. Museo Picasso)"
              value={activity.title}
              onChange={(e) =>
                updateActivity(index, "title", e.target.value)
              }
              required
            />

            <textarea
              className="form-control mb-2"
              placeholder="Why is this place worth visiting?"
              value={activity.description}
              onChange={(e) =>
                updateActivity(index, "description", e.target.value)
              }
              required
            />

            <input
              className="form-control"
              placeholder="Image URL (optional)"
              value={activity.img || ""}
              onChange={(e) =>
                updateActivity(index, "img", e.target.value)
              }
            />

            {activity.img && (
              <img
                src={activity.img}
                alt="preview"
                className="img-fluid mt-2 rounded"
              />
            )}

            <button
              type="button"
              className="btn btn-outline-danger mt-2"
              onClick={() => removeActivity(index)}
            >
              Remove place
            </button>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-outline-secondary mb-4"
          onClick={addActivity}
        >
          + Add place
        </button>

        <button className="btn btn-primary w-100">
          Save changes
        </button>
      </form>
    </div>
  );
}

export default EditPlan;
