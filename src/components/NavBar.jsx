import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginWithGoogle, logout } from "../services/auth.service";
import logo from "../assets/logo.png";

function NavBar({ search, setSearch }) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // ❌ No mostrar navbar en Landing
  if (location.pathname === "/") return null;

  const showSearch = location.pathname === "/home";

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/home");
    } catch (err) {
      console.error("Login error", err);
    }
  };

  const handleLogout = async () => {
    await logout();
    setSearch(""); // limpiamos buscador
    navigate("/home");
  };

  const handleHomeClick = () => {
    setSearch("");
  };

  return (
    <nav className="navbar navbar-dark bg-dark sticky-top py-2">
      <div className="container-fluid px-4 d-flex align-items-center">

        {/* LOGO */}
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/home"
          onClick={handleHomeClick}
        >
          <img src={logo} alt="Planora" height="48" />
        </Link>

        {/* SEARCH (solo Home) */}
        {showSearch && (
          <div className="flex-grow-1 d-flex justify-content-center">
            <input
              type="search"
              className="form-control"
              placeholder="Search by city or country"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                maxWidth: "420px",
                borderRadius: "999px",
              }}
            />
          </div>
        )}

        {/* RIGHT MENU */}
        <div className="ms-auto d-flex align-items-center gap-3">
          <NavLink className="nav-link text-white" to="/home">
            Home
          </NavLink>

          <NavLink className="nav-link text-white" to="/about">
            About
          </NavLink>

          {user ? (
            <>
              <NavLink className="nav-link text-white" to="/create">
                Create Plan
              </NavLink>

              <img
                src={user.photoURL}
                alt={user.displayName}
                title={user.displayName}
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />

              <button
                className="btn btn-sm btn-outline-light"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="btn btn-outline-light btn-sm"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
