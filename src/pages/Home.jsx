import { useEffect, useMemo, useState } from "react";
import PlanCard from "../components/PlanCard";
import { getAllPlans } from "../services/plans.service";

const normalize = (text = "") =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

function Home({ search }) {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    getAllPlans().then(setPlans);
  }, []);

  /* ================= SEARCH ================= */
  const query = normalize(search);
  const isSearching = query.length > 0;

  const filteredPlans = useMemo(() => {
    if (!isSearching) return plans;

    return plans.filter((plan) => {
      const city = normalize(plan.city);
      const country = normalize(plan.country);
      return city.includes(query) || country.includes(query);
    });
  }, [plans, query, isSearching]);

  /* ================= TOP PLANS (LIKES) ================= */
  const topPlans = useMemo(() => {
    return [...plans]
      .map((plan) => ({
        ...plan,
        likesCount: plan.likes
          ? Object.keys(plan.likes).length
          : 0,
      }))
      .sort((a, b) => b.likesCount - a.likesCount)
      .slice(0, 9)
      .filter((plan) => plan.likesCount > 0);
  }, [plans]);

  return (
    <div className="container my-5">

      {/* 🔥 TOP PLANS */}
      {!isSearching && topPlans.length > 0 && (
        <>
          <h2 className="fw-bold mb-1">🔥 Top plans</h2>
          <p className="text-muted mb-4">
            Most loved travel plans by the community
          </p>

          <div className="row g-4 mb-5">
            {topPlans.map((plan) => (
              <div className="col-lg-4 col-md-6" key={plan.id}>
                <PlanCard plan={plan} />
              </div>
            ))}
          </div>

          <hr className="my-5" />
        </>
      )}

      {/* 🌍 ALL PLANS / SEARCH RESULTS */}
      <h2 className="fw-semibold mb-1">
        {isSearching ? `Results for "${search}"` : "🌍 All plans"}
      </h2>

      <p className="text-muted mb-4">
        {isSearching
          ? "Plans matching your search"
          : "Discover all shared travel plans around the world"}
      </p>

      {isSearching && filteredPlans.length === 0 && (
        <p className="text-muted">No results found</p>
      )}

      <div className="row g-4">
        {(isSearching ? filteredPlans : plans).map((plan) => (
          <div className="col-lg-4 col-md-6" key={plan.id}>
            <PlanCard plan={plan} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

