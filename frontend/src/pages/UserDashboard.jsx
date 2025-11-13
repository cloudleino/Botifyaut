// client/src/pages/User.jsx
import { Link } from "react-router-dom";

export default function User() {
  const stats = [
    { label: "Orders", value: 12, icon: "🧾" },
    { label: "Active Robots", value: 3, icon: "🤖" },
    { label: "Messages", value: 4, icon: "💬" },
  ];

  const quickLinks = [
    {
      to: "/orders",
      icon: "📦",
      title: "My Orders",
      desc: "Track, filter and view order history.",
    },
    {
      to: "/robots",
      icon: "🤖",
      title: "Robots",
      desc: "See robot status and availability.",
    },
    {
      to: "/kitchen",
      icon: "🍳",
      title: "Kitchen",
      desc: "Live queue and preparation times.",
    },
  ];

  const activities = [
    "Order #1245 completed · 09:42",
    "Robot R3 battery low · 09:13",
    "Profile updated · 08:57",
  ];

  return (
    <div className="page-wrap fade-in">
      {/* HEADER */}
      <header className="user-hero">
        <div className="avatar glow" aria-hidden>
          👤
        </div>
        <div>
          <h1>User Dashboard</h1>
          <p>
            Welcome, <strong>Cai Leino</strong> — here’s a quick overview and
            shortcuts.
          </p>
        </div>
      </header>

      {/* STAT OVERVIEW */}
      <section className="stats-row">
        {stats.map((s, i) => (
          <div key={i} className="stat">
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
          </div>
        ))}
      </section>

      {/* QUICK ACTIONS */}
      <section>
        <h2 className="section-title">Quick Access</h2>
        <div className="cards-grid">
          {quickLinks.map((c, i) => (
            <Link key={i} to={c.to} className="card card-link">
              <div className="card-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* RECENT ACTIVITY */}
      <section className="card">
        <div className="card-head">
          <h2>Recent Activity</h2>
          <Link to="/analytics">View analytics →</Link>
        </div>
        <ul className="activity">
          {activities.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
