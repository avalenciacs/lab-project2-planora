import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="NavBar">
      <h2>Planora</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/plans/create">Create Plan</Link>
      </div>
    </nav>
  );
}

export default NavBar;