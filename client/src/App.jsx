import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

export default function App() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#F8FAFC" }}>
      {/* Sidomeny */}
      <nav
        className="d-flex flex-column p-3"
        style={{
          width: "250px",
          background: "#0B2447",
          color: "#E0E7FF",
        }}
      >
        <div className="text-center mb-4">
          <img
            src="/botify-logo.png"
            alt="Botify Logo"
            style={{ width: "80px", marginBottom: "10px" }}
          />
          <h3 style={{ fontWeight: 600 }}>BOTIFY</h3>
        </div>

        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="/analytics" className="nav-link text-light">
              <i className="bi bi-bar-chart-fill me-2"></i>Analytics
            </a>
          </li>
          <li><a href="/orders" className="nav-link text-light"><i className="bi bi-receipt-cutoff me-2"></i>Orders</a></li>
          <li><a href="/kitchen" className="nav-link text-light"><i className="bi bi-cup-hot me-2"></i>Kitchen</a></li>
          <li><a href="/robots" className="nav-link text-light"><i className="bi bi-robot me-2"></i>Robots</a></li>
          <li><a href="/admin" className="nav-link text-light"><i className="bi bi-gear me-2"></i>Admin</a></li>
          <li><a href="/manager" className="nav-link text-light"><i className="bi bi-briefcase me-2"></i>Manager</a></li>
          <li><a href="/user" className="nav-link text-light"><i className="bi bi-person me-2"></i>User</a></li>
          <li><a href="/login" className="nav-link text-light"><i className="bi bi-box-arrow-in-right me-2"></i>Login</a></li>
        </ul>

        <footer className="mt-auto text-center small text-secondary">
          © 2025 Botify Team
        </footer>
      </nav>

      {/* Huvudyta */}
      <main className="flex-fill p-5">
        <div className="text-center">
          <h1 style={{ color: "#0B2447" }}>Welcome to Botify Dashboard</h1>
          <p style={{ color: "#3B82F6" }}>
            Intelligent restaurant automation with AI-driven efficiency.
          </p>
        </div>
      </main>
    </div>
  );
}
