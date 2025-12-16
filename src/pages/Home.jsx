import { useEffect, useState } from "react";
import PlanCard from "../components/PlanCard";
import { getAllPlans } from "../services/plans.service";

function Home() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    const data = await getAllPlans();
    setPlans(data);
  };

  // ⭐ TOP PLANS (ordenados por votos)
  const topPlans = [...plans]
    .sort((a, b) => (b.votes || 0) - (a.votes || 0))
    .slice(0, 9);

  return (
    <div className="container my-5">

      {/* TOP PLANS */}
      <section className="mb-5">
        <h2 className="mb-4">⭐ Top travel plans</h2>

        <div className="row g-4">
          {topPlans.map(plan => (
            <div className="col-lg-4 col-md-6" key={plan.id}>
              <PlanCard plan={plan} />
            </div>
          ))}
        </div>
      </section>

      <hr />

      {/* ALL PLANS */}
      <section className="mt-5">
        <h2 className="mb-4">🌍 All plans</h2>

        <div className="row g-4">
          {plans.map(plan => (
            <div className="col-lg-4 col-md-6" key={plan.id}>
              <PlanCard plan={plan} />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;
