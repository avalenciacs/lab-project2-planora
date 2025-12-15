import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const BASE_URL =
  "https://planora-a08d1-default-rtdb.europe-west1.firebasedatabase.app";

function PlanDetails() {
  const { planId } = useParams();
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/places/${planId}.json`)
      .then((res) => setPlan(res.data))
      .catch((err) => console.error(err));
  }, [planId]);

  if (!plan) return <p>Loading...</p>;

  return (
    <div className="plan-details">
      {/* TITLE */}
      <h1 className="plan-title">{plan.name}</h1>

      {/* COVER IMAGE */}
      <div className="cover-wrapper">
        <img
          src={plan.coverImg}
          alt={plan.name}
          className="cover-image"
        />
      </div>

      {/* DESCRIPTION */}
      <p className="plan-description">{plan.description}</p>

      {/* EXPERIENCES */}
      <section className="experiences">
        <h2>Experiences</h2>
        <ul>
          {plan.experiencias &&
            Object.values(plan.experiencias).map((exp, index) => (
              <li key={index}>
                <strong>{exp.title}:</strong> {exp.text}
              </li>
            ))}
        </ul>
      </section>

      {/* PLACES TO EAT */}
      <section className="food">
        <h2>Places to eat</h2>

        <div className="food-list">
          {plan.lugaresParaComer &&
            Object.values(plan.lugaresParaComer).map((place, index) => (
              <div key={index} className="food-item">
                <img
                  src={place.img}
                  alt={place.name}
                  className="food-img"
                />
                <div className="food-info">
                  <h3>{place.name}</h3>
                  <p>{place.note}</p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

export default PlanDetails;
