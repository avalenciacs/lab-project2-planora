import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Collapse from "bootstrap/js/dist/collapse";

import { useAuth } from "../context/AuthContext";
import { loginWithGoogle, logout } from "../services/auth.service";
import logo from "../assets/logo.png";

function NavBar({ search, setSearch }) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // No mostrar navbar en Landing
  if (location.pathname === "/") return null;

  const showSearch = location.pathname === "/home";

  const collapseRef = useRef(null);
  const collapseInstance = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (collapseRef.current) {
      collapseInstance.current = new Collapse(collapseRef.current, {
        toggle: false,
      });
    }
  }, []);

  /* ================= MENU CONTROL ================= */
  const toggleMenu = () => {
    if (!collapseInstance.current) return;

    if (isOpen) {
      collapseInstance.current.hide();
    } else {
      collapseInstance.current.show();
    }

    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    collapseInstance.current?.hide();
    setIsOpen(false);
  };

  /* ================= AUTH ================= */
  const handleLogin = async () => {
    await loginWithGoogle();
    closeMenu();
    navigate("/home");
  };

  const handleLogout = async () => {
    await logout();
    setSearch("");
    closeMenu();
    navigate("/home");
  };

  const handleHomeClick = () => {
    setSearch("");
    closeMenu();
  };

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg sticky-top">
      <div className="container-fluid px-3">

        {/* LOGO */}
        <Link
          className="navbar-brand"
          to="/home"
          onClick={handleHomeClick}
        >
          <img src={logo} alt="Planora" height="40" />
        </Link>

        {/* HAMBURGER */}
        <button
          className="navbar-toggler"
          type="button"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* COLLAPSE */}
        <div
          ref={collapseRef}
          className="collapse navbar-collapse"
        >
          {/* SEARCH MOBILE */}
          {showSearch && (
            <div className="d-lg-none my-3">
              <input
                type="search"
                className="form-control"
                placeholder="Search by city or country"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}

          <ul className="navbar-nav ms-lg-auto text-center gap-2">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home" onClick={closeMenu}>
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/about" onClick={closeMenu}>
                About
              </NavLink>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/create" onClick={closeMenu}>
                    Create Plan
                  </NavLink>
                </li>

                <li className="nav-item mt-2">
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item mt-2">
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* SEARCH DESKTOP (CENTERED) */}
        {showSearch && (
          <div
            className="d-none d-lg-block position-absolute start-50 translate-middle-x"
            style={{ width: "420px" }}
          >
            <input
              type="search"
              className="form-control"
              placeholder="Search by city or country"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
