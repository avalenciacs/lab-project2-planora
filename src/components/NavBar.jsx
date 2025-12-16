import {
  Link,
  NavLink,
  useLocation,
  useNavigate
} from "react-router-dom";
import { useEffect } from "react";
import logo from "../assets/logo.png";

function NavBar({ search, setSearch }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";

  // 🧼 Limpiar buscador al salir de Home
  useEffect(() => {
    if (!isHome) {
      setSearch("");
    }
  }, [location.pathname]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 sticky-top">
      {/* LOGO */}
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img src={logo} alt="Planora logo" height="42" className="me-2" />
        <span className="fw-bold"></span>
      </Link>

      {/* BUSCADOR — SOLO EN HOME */}
      {isHome && (
        <div
          className="position-absolute start-50 translate-middle-x d-none d-lg-block"
          style={{ width: "420px" }}
        >
          <input
            type="text"
            className="form-control rounded-pill text-center shadow-sm"
            placeholder="Search by city (e.g. Málaga)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}


      {/* BOTÓN MOBILE */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#planoraNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* LINKS */}
      <div className="collapse navbar-collapse" id="planoraNavbar">
        <ul className="navbar-nav ms-auto">

          {/* BUSCADOR EN MOBILE */}
          {isHome && (
            <li className="nav-item d-lg-none my-3">
              <input
                type="text"
                className="form-control text-center"
                placeholder="Search by city"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </li>
          )}

          {/* HOME → limpia buscador */}
          <li className="nav-item">
            <button
              className="nav-link btn btn-link text-white"
              onClick={() => {
                setSearch("");
                navigate("/");
              }}
            >
              Home
            </button>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/create">
              Create Plan
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
