// 📁 frontend/src/components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../utils/auth";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();          // clear localStorage / token
    setUser(null);     // clear user context
    navigate("/login"); // redirect to login
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-custom px-4"
      style={{
        backgroundColor: "var(--brand-900)",
        color: "white",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      }}
    >
      <NavLink className="navbar-brand fw-bold text-white" to="/">
        BOTIFY
      </NavLink>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto gap-2 align-items-center">
          {!user && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/register">
                  Register
                </NavLink>
              </li>
            </>
          )}

          {user && (
            <>
              <li className="nav-item me-2">
                <span className="text-light small">
                  👋 {user.fullname} ({user.role})
                </span>
              </li>
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-sm"
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
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
