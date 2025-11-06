import React, { useState, useEffect } from "react";
import { NavLink, useLocation, Link, useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

export default function Layout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const baseLink =
    "nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition position-relative";

  const activeStyle = {
    background: "linear-gradient(90deg, #0D6EFD33, #1E90FF55)",
    color: "#ffffff",
    boxShadow: "0 0 12px #0d6efd77",
  };

  const inactiveStyle = {
    color: "rgba(255,255,255,0.8)",
    transition: "all 0.3s ease",
  };

  useEffect(() => {
    // Check initial auth state
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // Listen for auth changes
    const handleAuthChange = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    window.addEventListener('auth-change', handleAuthChange);

    // Cleanup listener
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };

  // Define navigation items
  const navItems = [
    { to: "/analytics", icon: "bi-bar-chart-fill", label: "Analytics" },
    { to: "/orders", icon: "bi-box-seam", label: "Orders" },
    { to: "/kitchen", icon: "bi-egg-fried", label: "Kitchen" },
    { to: "/robots", icon: "bi-robot", label: "Robots" },
    { to: "/admin", icon: "bi-person-gear", label: "Admin" },
    { to: "/manager", icon: "bi-briefcase-fill", label: "Manager" },
    { to: "/user", icon: "bi-person-circle", label: "User" },
  ];

  // Only show login if not logged in
  if (!isLoggedIn) {
    navItems.push({ to: "/login", icon: "bi-lock-fill", label: "Login" });
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="text-center mb-4">
          <img
            src="/loggabot1.png"
            alt="Botify logo"
            className="sidebar-logo"
          />
          <h3 className="sidebar-title">BOTIFY</h3>
        </div>

        <nav className="flex-grow-1">
          <ul className="nav flex-column gap-2">
            {navItems.map(({ to, icon, label }) => (
              <li className="nav-item" key={to}>
                <NavLink
                  to={to}
                  className={baseLink}
                  style={({ isActive }) =>
                    isActive
                      ? { ...activeStyle, transform: "translateX(4px)" }
                      : inactiveStyle
                  }
                >
                  <i className={icon} />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
            {/* Add logout button when logged in */}
            {isLoggedIn && (
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className={baseLink}
                  style={{
                    ...inactiveStyle,
                    border: 'none',
                    background: 'none',
                    width: '100%',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <i className="bi-box-arrow-right" />
                  <span>Logout</span>
                </button>
              </li>
            )}
          </ul>
        </nav>

        <footer className="sidebar-footer">
          <div>© 2025 Botify Team</div>
          <a
            href="https://github.com/your-org/botify"
            className="text-decoration-none"
          >
            View Project on GitHub
          </a>
        </footer>
      </aside>

      <main className={`content ${isLoginPage ? "content-auth" : ""}`}>
        {children}
      </main>
    </div>
  );
}