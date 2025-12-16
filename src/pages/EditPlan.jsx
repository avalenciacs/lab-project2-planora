import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlanById, updatePlan } from "../services/plans.service";

function EditPlan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    city: "",
    coverImg: "",
    description: "",
    activities: []
  });

  const [loading, setLoading] = useState(true);

  /* ================= LOAD PLAN ================= */
  useEffect(() => {
    loadPlan();
  }, []);

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
            ...value
          }))
        : []
    });

    setLoading(false);
  };

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
          img: ""
        }
      ]
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

    const activitiesObject = {};
    formData.activities.forEach((act, index) => {
      activitiesObject[`a${index + 1}`] = {
        type: act.type,
        title: act.title,
        description: act.description,
        ...(act.img && { img: act.img })
      };
    });

    const updatedPlan = {
      name: formData.name,
      country: formData.country,
      city: formData.city,
      coverImg: formData.coverImg,
      description: formData.description,
      actividades: activitiesObject
    };

    await updatePlan(id, updatedPlan);
    navigate(`/plans/${id}`);
  };

  /* ================= UI ================= */
  if (loading) return <p className="text-center mt-5">Loading plan...</p>;

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
        />

        <input
          className="form-control mb-3"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="coverImg"
          placeholder="Cover image URL"
          value={formData.coverImg}
          onChange={handleChange}
        />

        <textarea
          className="form-control mb-4"
          name="description"
          placeholder="Plan description"
          value={formData.description}
          onChange={handleChange}
        />

        <hr />

        {/* ACTIVITIES */}
        <h4 className="mb-3">Activities</h4>

        {formData.activities.map((activity, index) => (
          <div key={activity.id || index} className="border rounded p-3 mb-3">
            <select
              className="form-select mb-2"
              value={activity.type}
              onChange={(e) =>
                updateActivity(index, "type", e.target.value)
              }
            >
              <option value="experience">Experience</option>
              <option value="food">Food</option>
              <option value="nature">Nature</option>
              <option value="culture">Culture</option>
              <option value="nightlife">Nightlife</option>
              <option value="leisure">Leisure</option>
            </select>

            <input
              className="form-control mb-2"
              placeholder="Activity title"
              value={activity.title}
              onChange={(e) =>
                updateActivity(index, "title", e.target.value)
              }
            />

            <textarea
              className="form-control mb-2"
              placeholder="Activity description"
              value={activity.description}
              onChange={(e) =>
                updateActivity(index, "description", e.target.value)
              }
            />

            <input
              className="form-control mb-2"
              placeholder="Image URL (optional)"
              value={activity.img || ""}
              onChange={(e) =>
                updateActivity(index, "img", e.target.value)
              }
            />

            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => removeActivity(index)}
            >
              Remove activity
            </button>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-outline-secondary mb-4"
          onClick={addActivity}
        >
          + Add activity
        </button>

        <br />

        <button className="btn btn-primary w-100">
          Save changes
        </button>
      </form>
    </div>
  );
}

export default EditPlan;
