import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 sticky-top">
      {/* Logo + nombre */}
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          src={logo}
          alt="Planora logo"
          height="50"
          className="me-2"
        />
        <span className="fw-bold"></span>
      </Link>

      {/* Botón responsive */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#planoraNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Links */}
      <div className="collapse navbar-collapse" id="planoraNavbar">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
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