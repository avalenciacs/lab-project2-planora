import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getPlanById,
  likePlan,
  unlikePlan,
  deletePlan,
} from "../services/plans.service";
import { useAuth } from "../context/AuthContext";

const ADMINS = [
  "NXZSvwKCHlbVUnK5T55yF6Ane5y2",
  "EBJUI9vlA6W5g0dh6FwMsp1o3V83",
];

function PlanDetails() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [plan, setPlan] = useState(null);
  const [hasLiked, setHasLiked] = useState(false);

  /* ================= LOAD ================= */
  useEffect(() => {
    const loadPlan = async () => {
      const data = await getPlanById(id);
      setPlan(data);

      if (user && data?.likes) {
        setHasLiked(!!data.likes[user.uid]);
      } else {
        setHasLiked(false);
      }
    };

    loadPlan();
  }, [id, user]);

  if (!plan) {
    return <p className="text-center mt-5">Loading plan...</p>;
  }

  /* ================= PERMISSIONS ================= */
  const isAuthor = user && user.uid === plan.authorId;
  const isAdmin = user && ADMINS.includes(user.uid);
  const canEdit = isAuthor || isAdmin;

  /* ================= LIKES ================= */
  const likesCount = plan.likes
    ? Object.keys(plan.likes).length
    : 0;

  const handleLikeToggle = async () => {
    if (!user) {
      alert("You must be logged in to like this plan");
      return;
    }

    if (hasLiked) {
      await unlikePlan(id, user.uid);

      const updatedLikes = { ...(plan.likes || {}) };
      delete updatedLikes[user.uid];

      setPlan({ ...plan, likes: updatedLikes });
      setHasLiked(false);
    } else {
      await likePlan(id, user.uid);

      setPlan({
        ...plan,
        likes: { ...(plan.likes || {}), [user.uid]: true },
      });
      setHasLiked(true);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    if (!window.confirm("Delete this plan?")) return;

    await deletePlan(id);
    navigate("/home");
  };

  const activities = plan.actividades
    ? Object.values(plan.actividades)
    : [];

  /* ================= UI ================= */
  return (
    <div className="container my-5">
      {/* COVER IMAGE */}
      {plan.coverImg && (
        <img
          src={plan.coverImg}
          alt={plan.name}
          className="img-fluid rounded mb-4"
          style={{ maxHeight: "450px", width: "100%", objectFit: "cover" }}
        />
      )}

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h1 className="mb-1">{plan.name}</h1>

          <p className="text-muted mb-1">
            {plan.city}, {plan.country}
          </p>

          <p className="text-muted mb-1">
            Created by <strong>{plan.authorName || "Unknown"}</strong>
          </p>

          <p className="text-muted">
            {plan.createdAt
              ? new Date(plan.createdAt).toLocaleDateString()
              : ""}
          </p>
        </div>

        {/* ❤️ LIKE + ACTIONS */}
        <div className="d-flex align-items-center gap-3">
          <button
            onClick={handleLikeToggle}
            className="btn btn-light border-0 d-flex align-items-center gap-2"
            style={{ fontSize: "1.4rem" }}
            aria-label={hasLiked ? "Unlike" : "Like"}
          >
            <span>{hasLiked ? "❤️" : "🤍"}</span>
            <span className="fs-6 text-muted">
              {likesCount} {likesCount === 1 ? "like" : "likes"}
            </span>
          </button>

          {canEdit && (
            <>
              <Link
                to={`/plans/${id}/edit`}
                className="btn btn-outline-secondary btn-sm"
              >
                ✏️ Edit
              </Link>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleDelete}
              >
                🗑️ Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* DESCRIPTION */}
      <p className="lead">{plan.description}</p>

      <hr />

      {/* ACTIVITIES */}
      <h3 className="mb-4">Places to visit</h3>

      <div className="row g-4">
        {activities.map((act, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100">
              {act.img && (
                <img
                  src={act.img}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                  alt={act.title}
                />
              )}

              <div className="card-body">
                <span className="badge bg-secondary mb-2">
                  {act.type}
                </span>

                <h5>{act.title}</h5>
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


