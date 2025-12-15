import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { BASE_URL } from "../config/api";

function EditPlanPage() {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const { planId } = useParams();
  const navigate = useNavigate();

  // Get plan details and pre-fill the form
  useEffect(() => {
    axios
      .get(`${BASE_URL}/plans/${planId}`)
      .then((response) => {
        setTitle(response.data.title);
        setCity(response.data.city);
        setCategory(response.data.category);
        setDescription(response.data.description);
      })
      .catch((e) =>
        console.log("Error getting plan details from the API...", e)
      );
  }, [planId]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPlan = {
      title,
      city,
      category,
      description,
    };

    axios
      .put(`${BASE_URL}/plans/${planId}`, updatedPlan)
      .then(() => {
        navigate(`/plans/${planId}`);
      })
      .catch((e) => console.log("Error updating plan...", e));
  };

  return (
    <div className="EditPlanPage container">
      <h3>Edit Plan</h3>

      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          City:
          <input
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>

        <label>
          Category:
          <input
            type="text"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>

        <label>
          Description:
          <input
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <button>Update plan</button>
      </form>
    </div>
  );
}

export default EditPlanPage;