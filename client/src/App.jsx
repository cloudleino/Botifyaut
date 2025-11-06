import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import "./App.css";


export default function App() {
  return (
    <div
      className="d-flex flex-column flex-md-row"
      style={{
        minHeight: "100vh",
        background: "#F8FAFC",
        fontFamily: "Inter, Open Sans, Roboto, sans-serif",
      }}
    >
      {/* Sidomeny */}
      <nav
        className="d-flex flex-column p-4 shadow-sm"
        style={{
          width: "260px",
          background: "#0B2447",
          color: "#E0E7FF",
        }}
      >
        <div className="text-center mb-4">
          <img
            src="/botify-logo.png"
            alt="Botify Logo"
            style={{
              width: "85px",
              marginBottom: "10px",
              filter: "drop-shadow(0 0 6px #3B82F6)",
            }}
          />
          <h3 style={{ fontWeight: 600, letterSpacing: "1px" }}>BOTIFY</h3>
        </div>

        <ul className="nav nav-pills flex-column mb-auto">
          <li>
            <a href="/analytics" className="nav-link text-light">
              <i className="bi bi-bar-chart-fill me-2"></i>Analytics
            </a>
          </li>
          <li>
            <a href="/orders" className="nav-link text-light">
              <i className="bi bi-receipt-cutoff me-2"></i>Orders
            </a>
          </li>
          <li>
            <a href="/kitchen" className="nav-link text-light">
              <i className="bi bi-cup-hot me-2"></i>Kitchen
            </a>
          </li>
          <li>
            <a href="/robots" className="nav-link text-light">
              <i className="bi bi-robot me-2"></i>Robots
            </a>
          </li>
          <li>
            <a href="/admin" className="nav-link text-light">
              <i className="bi bi-gear-fill me-2"></i>Admin
            </a>
          </li>
          <li>
            <a href="/manager" className="nav-link text-light">
              <i className="bi bi-briefcase-fill me-2"></i>Manager
            </a>
          </li>
          <li>
            <a href="/user" className="nav-link text-light">
              <i className="bi bi-person-circle me-2"></i>User
            </a>
          </li>
          <li>
            <a href="/login" className="nav-link text-light">
              <i className="bi bi-box-arrow-in-right me-2"></i>Login
            </a>
          </li>
        </ul>

        <footer
          className="mt-auto text-center small"
          style={{ color: "#93C5FD", marginTop: "auto" }}
        >
          © 2025 Botify Team
          <br />
          <a
            href="https://github.com/cloudleino/Botifyaut"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none text-secondary"
          >
            View Project on GitHub
          </a>
        </footer>
      </nav>

      {/* Huvudyta */}
      <main className="flex-fill d-flex flex-column justify-content-center align-items-center text-center p-5">
        <h1 style={{ color: "#0B2447", fontWeight: "600" }}>
          Welcome to Botify Dashboard
        </h1>
        <p style={{ color: "#3B82F6", fontSize: "1.2rem" }}>
          Intelligent restaurant automation with AI-driven efficiency.
        </p>
        <button
          className="btn btn-primary mt-3"
          style={{
            background: "#3B82F6",
            border: "none",
            fontWeight: "500",
            padding: "10px 30px",
            borderRadius: "8px",
          }}
        >
          Explore System
        </button>
      </main>
    </div>
  );
}
