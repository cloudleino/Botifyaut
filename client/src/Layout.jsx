import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Global layout för Botify-appen.
 * - Vänster: mörk sidomeny med logga och navigation
 * - Höger: innehållsyta där routes renderas via {children}
 */
export default function Layout({ children }) {
  // Bas-klasser för länkar i sidomenyn
  const baseLink =
    "nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-2";

  // Aktiv/inaktiv stil
  const activeStyle = {
    backgroundColor: "#112e5a",
    color: "#ffffff",
  };
  const inactiveStyle = {
    color: "rgba(255,255,255,0.75)",
  };

  return (
    <div className="d-flex">
      {/* SIDOMENY */}
      <aside
        className="d-flex flex-column text-white p-4"
        style={{
          width: 260,
          minHeight: "100vh",
          backgroundColor: "#0B2447",
        }}
        aria-label="Sidomeny"
      >
        {/* LOGGA + NAMN */}
        <div className="mb-4 w-100 text-center">
          <div className="d-flex align-items-center justify-content-center gap-3">
            <img
              src="/loggabot1.png"            // <-- din fil i client/public/
              alt="Botify logo"
              title="Botify"
              style={{
                width: 64,
                height: 64,
                objectFit: "contain",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
                boxShadow: "0 0 0 1px #23395D inset",
                display: "block",
              }}
            />
            <h3 className="fw-bold text-white m-0" style={{ letterSpacing: 1 }}>
              BOTIFY
            </h3>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="w-100" aria-label="Huvudnavigation">
          <ul className="nav flex-column gap-1">
            <li className="nav-item">
              <NavLink
                to="/analytics"
                className={baseLink}
                style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
              >
                <span role="img" aria-label="analytics">⚙️</span>
                <span>Analytics</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/orders"
                className={baseLink}
                style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
              >
                <span role="img" aria-label="orders">📦</span>
                <span>Orders</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/kitchen"
                className={baseLink}
                style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
              >
                <span role="img" aria-label="kitchen">👨‍🍳</span>
                <span>Kitchen</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/robots"
                className={baseLink}
                style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
              >
                <span role="img" aria-label="robots">🤖</span>
                <span>Robots</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/admin"
                className={baseLink}
                style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
              >
                <span role="img" aria-label="admin">🧑‍💼</span>
                <span>Admin</span>
              </NavLink>
            </li>

            {/* valfria länkar */}
            <li className="nav-item">
              <NavLink
                to="/manager"
                className={baseLink}
                style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
              >
                <span role="img" aria-label="manager">💼</span>
                <span>Manager</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/user"
                className={baseLink}
                style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
              >
                <span role="img" aria-label="user">👤</span>
                <span>User</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/login"
                className={baseLink}
                style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
              >
                <span role="img" aria-label="login">🔐</span>
                <span>Login</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* FOTNOT */}
        <div className="mt-auto w-100 pt-3">
          <hr style={{ borderColor: "#23395D", opacity: 0.5 }} />
          <footer className="text-center small">
            <div className="text-secondary" style={{ color: "#9fb3c8" }}>
              © 2025 Botify Team — All rights reserved.
            </div>
            <a
              href="https://github.com/your-org/botify"
              className="text-decoration-none"
              style={{ color: "#78a9ff" }}
            >
              View Project on GitHub
            </a>
          </footer>
        </div>
      </aside>

      {/* INNEHÅLLSYTA */}
      <main
        className="flex-grow-1 p-4"
        style={{ backgroundColor: "#F8FAFC", minHeight: "100vh" }}
      >
        {children}
      </main>
    </div>
  );
}
