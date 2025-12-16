import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPlanById } from "../services/plans.service";



function PlanDetails() {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    loadPlan();
  }, [id]);



  
  const loadPlan = async () => {
    const data = await getPlanById(id);
    setPlan(data);
  };

  if (!plan) {
    return <p className="text-center mt-5">Loading plan...</p>;
  }

  // Convertimos actividades (objeto) a array
  const activities = plan.actividades
    ? Object.values(plan.actividades)
    : [];

  const experiences = activities.filter(a => a.type === "experience");
  const food = activities.filter(a => a.type === "food");

  return (
    <div className="container my-5">

      {/* HERO IMAGE */}
      <img
        src={plan.coverImg}
        alt={plan.name}
        className="img-fluid rounded mb-4"
        style={{ maxHeight: "450px", width: "100%", objectFit: "cover" }}
      />

      <h1 className="mb-2">{plan.name}</h1>
      <p className="text-muted">{plan.description}</p>

      <hr />

      {/* EXPERIENCES */}
      {experiences.length > 0 && (
        <>
          <h4>Experiences</h4>
          <ul>
            {experiences.map((exp, index) => (
              <li key={index}>
                <strong>{exp.title}:</strong> {exp.description}
              </li>
            ))}
          </ul>
          <hr />
        </>
      )}

      {/* FOOD */}
      {food.length > 0 && (
        <>
          <h4>Places to eat</h4>

          <div className="row g-3">
            {food.map((place, index) => (
              <div className="col-md-6" key={index}>
                <div className="card h-100">
                  {place.img && (
                    <img
                      src={place.img}
                      className="card-img-top"
                      style={{ height: "180px", objectFit: "cover" }}
                      alt={place.title}
                    />
                  )}
                  <div className="card-body">
                    <h6>{place.title}</h6>
                    <p className="text-muted">{place.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
}

export default PlanDetails;
