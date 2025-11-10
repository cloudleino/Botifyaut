// client/src/pages/User.jsx
export default function User() {
  return (
    <div className="page-wrap">
      <header className="user-hero">
        <div className="avatar" aria-hidden>👤</div>
        <div>
          <h1>User Dashboard</h1>
          <p>Welcome, <strong>Cai Leino</strong> — here’s a quick overview and shortcuts.</p>
        </div>
      </header>

      {/* Stats row */}
      <section className="stats-row">
        <div className="stat">
          <div className="stat-label">Orders</div>
          <div className="stat-value">12</div>
        </div>
        <div className="stat">
          <div className="stat-label">Active robots</div>
          <div className="stat-value">3</div>
        </div>
        <div className="stat">
          <div className="stat-label">Messages</div>
          <div className="stat-value">4</div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="cards-grid">
        <a className="card card-link" href="/orders">
          <div className="card-icon">🧾</div>
          <h2>My Orders</h2>
          <p>Track, filter and view order history.</p>
        </a>

        <a className="card card-link" href="/robots">
          <div className="card-icon">🤖</div>
          <h2>Robots</h2>
          <p>See robot status and availability.</p>
        </a>

        <a className="card card-link" href="/kitchen">
          <div className="card-icon">🔎</div>
          <h2>Kitchen</h2>
          <p>Live queue and preparation times.</p>
        </a>
      </section>

      {/* Recent activity */}
      <section className="card">
        <div className="card-head">
          <h2>Recent activity</h2>
          <a href="/analytics">View analytics →</a>
        </div>
        <ul className="activity">
          <li>Order #1245 completed · 09:42</li>
          <li>Robot R3 battery low · 09:13</li>
          <li>Profile updated · 08:57</li>
        </ul>
      </section>
    </div>
  );
}
