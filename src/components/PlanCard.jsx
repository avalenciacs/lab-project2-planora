import { Link } from "react-router-dom";

function PlanCard({ plan }) {
  return (
    <Link
      to={`/plans/${plan.id}`}
      className="text-decoration-none text-dark"
    >
      <div className="card plan-card h-100 shadow-sm border-0">

        {/* IMAGE */}
        <img
          src={plan.coverImg}
          className="card-img-top"
          alt={plan.name}
          style={{ height: "200px", objectFit: "cover" }}
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{plan.name}</h5>

          <p className="text-muted mb-1">
            {plan.city}, {plan.country}
          </p>

          <p className="card-text small">
            {plan.description}
          </p>

          <div className="mt-auto d-flex justify-content-between align-items-center">
            {/* ❤️ LIKES */}
            <span className="text-muted">
              ❤️ {plan.likes ? Object.keys(plan.likes).length : 0}
            </span>

            <span className="fw-semibold text-primary">
              View details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlanCard;
