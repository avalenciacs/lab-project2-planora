import { Link } from "react-router-dom";

function PlanCard({ plan }) {
  const likesCount = plan.likes
    ? Object.keys(plan.likes).length
    : 0;

  return (
    <div className="card plan-card h-100">
      <img
        src={plan.coverImg}
        className="card-img-top"
        alt={plan.name}
        style={{ height: "200px", objectFit: "cover" }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{plan.name}</h5>

        <p className="text-muted mb-1">{plan.city}</p>

        <p className="card-text">{plan.description}</p>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          {/* ❤️ LIKES */}
          <span className="text-muted">
            ❤️ {likesCount} {likesCount === 1 ? "like" : "likes"}
          </span>

          <Link
            to={`/plans/${plan.id}`}
            className="btn btn-outline-primary btn-sm"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PlanCard;
