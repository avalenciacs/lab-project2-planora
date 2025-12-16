import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getPlanById,
  updateVotes,
  deletePlan,
} from "../services/plans.service";

function PlanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [plan, setPlan] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  // LOAD PLAN + CHECK VOTE
  useEffect(() => {
    loadPlan();

    const votedPlans = JSON.parse(localStorage.getItem("votedPlans")) || [];
    setHasVoted(votedPlans.includes(id));
  }, [id]);

  const loadPlan = async () => {
    const data = await getPlanById(id);
    setPlan(data);
  };

  // LOADING STATE
  if (!plan) {
    return <p className="text-center mt-5">Loading plan...</p>;
  }

  // NORMALIZE ACTIVITIES (Firebase object → array)
  const activities = plan.actividades
    ? Object.values(plan.actividades)
    : [];

  // VOTE HANDLERS
  const handleVote = async () => {
    if (hasVoted) return;

    const newVotes = (plan.votes || 0) + 1;
    await updateVotes(id, newVotes);

    setPlan({ ...plan, votes: newVotes });

    const votedPlans = JSON.parse(localStorage.getItem("votedPlans")) || [];
    localStorage.setItem(
      "votedPlans",
      JSON.stringify([...votedPlans, id])
    );

    setHasVoted(true);
  };

  const handleUnvote = async () => {
    if (!hasVoted) return;

    const newVotes = Math.max((plan.votes || 0) - 1, 0);
    await updateVotes(id, newVotes);

    setPlan({ ...plan, votes: newVotes });

    const votedPlans = JSON.parse(localStorage.getItem("votedPlans")) || [];
    localStorage.setItem(
      "votedPlans",
      JSON.stringify(votedPlans.filter(pid => pid !== id))
    );

    setHasVoted(false);
  };

  // DELETE PLAN
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this plan?"
    );

    if (!confirmDelete) return;

    await deletePlan(id);
    navigate("/");
  };

  return (
    <div className="container my-5">

      {/* HERO IMAGE */}
      <img
        src={plan.coverImg}
        alt={plan.name}
        className="img-fluid rounded mb-4"
        style={{ maxHeight: "450px", width: "100%", objectFit: "cover" }}
      />

      {/* TITLE + ACTIONS */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
        <div>
          <h1>{plan.name}</h1>
          <p className="text-muted">
            {plan.city}, {plan.country}
          </p>
        </div>

        <div className="d-flex gap-2 mt-3 mt-md-0">
          <Link
            to={`/plans/${id}/edit`}
            className="btn btn-outline-secondary"
          >
            ✏️ Edit
          </Link>

          <button
            className="btn btn-outline-danger"
            onClick={handleDelete}
          >
            🗑️ Delete
          </button>
        </div>
      </div>

      {/* DESCRIPTION */}
      <p className="lead">{plan.description}</p>

      {/* VOTES */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <span className="fs-5">⭐ {plan.votes || 0} votes</span>

        {!hasVoted ? (
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={handleVote}
          >
            👍 Vote
          </button>
        ) : (
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={handleUnvote}
          >
            👎 Remove vote
          </button>
        )}
      </div>

      <hr />

      {/* ACTIVITIES */}
      <h3 className="mb-4">Activities</h3>

      <div className="row g-4">
        {activities.map((act, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100">

              {act.img && (
                <img
                  src={act.img}
                  className="card-img-top"
                  style={{
                    height: "180px",
                    objectFit: "cover",
                  }}
                  alt={act.title}
                />
              )}

              <div className="card-body">
                <span className="badge bg-secondary mb-2">
                  {act.type}
                </span>

                <h5 className="card-title">{act.title}</h5>
                <p className="text-muted">{act.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default PlanDetails;
