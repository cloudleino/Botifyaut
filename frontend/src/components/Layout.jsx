import { NavLink } from "react-router-dom";
import { logout } from "../utils/auth";  // ✅ add this import

export default function Layout({ children }) {
  const linkClass = ({ isActive }) =>
    `nav-link text-white px-3 py-2 rounded ${isActive ? "active" : ""}`;

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <aside
        className="d-flex flex-column align-items-center p-4"
        style={{
          minHeight: "100vh",
          width: 250,
          background: "linear-gradient(180deg, #0B2447 0%, #19376D 100%)",
        }}
      >
        {/* Logo + BOTIFY title */}
        <div className="text-center mb-4">
          <img
            src="/loggabot1.png"
            alt="Botify Logo"
            style={{
              width: 80,
              height: 80,
              objectFit: "contain",
              marginBottom: 8,
              filter: "drop-shadow(0 0 6px rgba(87,108,188,0.8))",
              animation: "pulseGlow 3s infinite alternate",
            }}
          />
          <h3 className="fw-bold text-white mb-0">BOTIFY</h3>
        </div>

        {/* Navigation links */}
        <ul className="nav flex-column w-100 gap-1">
          <li className="nav-item">
            <NavLink to="/admin" className={linkClass}>
              <i className="bi bi-person-gear me-2"></i> Admin
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/manager" className={linkClass}>
              <i className="bi bi-bar-chart-fill me-2"></i> Manager
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/robot" className={linkClass}>
              <i className="bi bi-cpu me-2"></i> Robots
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/cooker" className={linkClass}>
              <i className="bi bi-egg-fried me-2"></i> Cooker
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user" className={linkClass}>
              <i className="bi bi-person me-2"></i> User
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login" className={linkClass}>
              <i className="bi bi-lock me-2"></i> Login
            </NavLink>
          </li>

          {/* 🟦 Logout button */}
          <li className="nav-item mt-3">
            <button
              onClick={logout}
              className="w-100 text-white fw-bold"
              style={{
                backgroundColor: "#576CBC",
                border: "none",
                borderRadius: "6px",
                padding: "10px",
                fontSize: "0.95rem",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#19376D")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#576CBC")}
            >
              <i className="bi bi-box-arrow-right me-2"></i> Logout
            </button>
          </li>
        </ul>

        {/* Sidebar footer */}
        <footer
          className="mt-auto text-center text-white small"
          style={{ borderTop: "1px solid #23395D", paddingTop: 10 }}
        >
          © 2025 Botify
        </footer>
      </aside>

      {/* Main content + bottom footer */}
      <main
        className="flex-grow-1 d-flex flex-column"
        style={{
          background: "#0B2D3A",
          minHeight: "100vh",
          color: "#FFFFFF",
        }}
      >
        <div className="container-fluid py-4 flex-grow-1">{children}</div>

        <footer
          className="text-center small py-3"
          style={{
            background: "#19376D",
            borderTop: "1px solid #23395D",
            color: "#F8FAFC",
          }}
        >
          Built with ❤️ <strong>By AWS Developement Jensen Stockholm</strong> — Botifyaut 2025
        </footer>
      </main>
    </div>
  );
}
