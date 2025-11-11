// client/src/pages/ManagerDashboard.jsx
import React, { useEffect, useState } from 'react';

export default function ManagerDashboard() {
  const [robots, setRobots] = useState([]);
  const [form, setForm] = useState({ name: '', model: '', status: 'idle' });
  const [counts, setCounts] = useState({ orders: 0, robots: 0, users: 0 });
  const [loading, setLoading] = useState(false);
  const API = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const load = async () => {
    const [r1, r2] = await Promise.all([
      fetch(`${API}/api/manager/overview`, { credentials: 'include' }),
      fetch(`${API}/api/manager/robots`, { credentials: 'include' })
    ]);
    setCounts(await r1.json());
    setRobots(await r2.json());
  };

  useEffect(() => { load(); }, []);

  const createRobot = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`${API}/api/manager/robots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form)
    });
    setForm({ name: '', model: '', status: 'idle' });
    await load();
    setLoading(false);
  };

  const updateRobot = async (id, patch) => {
    await fetch(`${API}/api/manager/robots/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(patch)
    });
    await load();
  };

  const removeRobot = async (id) => {
    await fetch(`${API}/api/manager/robots/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    await load();
  };

  return (
    <div className="page-wrap">
      <header className="user-hero">
        <div className="avatar glow" aria-hidden>🧭</div>
        <div>
          <h1>Manager Dashboard</h1>
          <p>Quick ops: robots, assignments & overview.</p>
        </div>
      </header>

      {/* Stats */}
      <section className="stats-row">
        <div className="stat"><div className="stat-label">Orders</div><div className="stat-value">{counts.orders}</div></div>
        <div className="stat"><div className="stat-label">Robots</div><div className="stat-value">{counts.robots}</div></div>
        <div className="stat"><div className="stat-label">Users</div><div className="stat-value">{counts.users}</div></div>
      </section>

      {/* Create */}
      <section className="card">
        <div className="card-head">
          <h3>Create Robot</h3>
        </div>
        <form onSubmit={createRobot} className="grid gap-2" style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr auto', gap:'0.6rem'}}>
          <input required placeholder="Name"   value={form.name}   onChange={e=>setForm({...form, name:e.target.value})}/>
          <input required placeholder="Model"  value={form.model}  onChange={e=>setForm({...form, model:e.target.value})}/>
          <select value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
            <option value="idle">idle</option>
            <option value="active">active</option>
            <option value="offline">offline</option>
          </select>
          <button disabled={loading} className="btn-primary">{loading ? 'Saving…' : 'Add'}</button>
        </form>
      </section>

      {/* List & inline edit */}
      <section className="card" style={{marginTop:'1rem'}}>
        <div className="card-head">
          <h3>Robots</h3>
        </div>
        <div className="table-like">
          {robots.map(r => (
            <div key={r._id} className="row">
              <div><strong>{r.name}</strong><div className="muted">{r.model}</div></div>
              <div>
                <select value={r.status} onChange={e=>updateRobot(r._id, { status: e.target.value })}>
                  <option value="idle">idle</option>
                  <option value="active">active</option>
                  <option value="offline">offline</option>
                </select>
              </div>
              <div><button className="btn-danger" onClick={()=>removeRobot(r._id)}>Delete</button></div>
            </div>
          ))}
          {robots.length === 0 && <div className="muted">No robots yet.</div>}
        </div>
      </section>
    </div>
  );
}

