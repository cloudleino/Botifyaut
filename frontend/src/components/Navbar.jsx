import { NavLink } from "react-router-dom";
import { logout } from "../utils/auth";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom px-4">
      <NavLink className="navbar-brand fw-bold" to="/">BOTIFY</NavLink>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto gap-2">
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">Register</NavLink>
          </li>
          {/* ✅ Add Logout button here */}
          <li className="nav-item">
            <button
              onClick={logout}
              className="btn btn-primary"
              style={{
                backgroundColor: "var(--brand-500)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "6px 12px",
                fontSize: "0.9rem",
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
