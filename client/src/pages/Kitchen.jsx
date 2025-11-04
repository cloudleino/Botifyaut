// client/src/pages/Kitchen.jsx
import { useEffect, useMemo, useState } from "react";

const API_BASE =
  (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

export default function Kitchen() {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr]         = useState("");

  // Vi hämtar alla orders och filtrerar i clienten till "icke klara"
  const endpoint = useMemo(() => `${API_BASE}/api/orders`, []);

  async function fetchOrders() {
    setLoading(true);
    setErr("");
    try {
      const r = await fetch(endpoint, { headers: { "Accept": "application/json" } });
      console.log("[Kitchen] GET", endpoint, "status:", r.status);
      if (!r.ok) throw new Error(`GET /orders → ${r.status}`);
      const data = await r.json();
      setOrders(Array.isArray(data) ? data.filter(o => o.status !== "Klar") : []);
    } catch (e) {
      console.error("[Kitchen] Fetch error:", e);
      setErr("Kunde inte hämta beställningar.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  async function markDone(id) {
    try {
      const r = await fetch(`${endpoint}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Klar" }),
      });
      if (!r.ok) throw new Error(`PUT /orders/${id} → ${r.status}`);
      const updated = await r.json();
      setOrders(prev => prev.filter(o => o._id !== updated._id)); // ta bort från kö-vyn
    } catch (e) {
      console.error("[Kitchen] PUT error:", e);
      alert("Kunde inte markera som klar.");
    }
  }

  useEffect(() => { fetchOrders(); }, []);

  return (
    <div className="page">
      <h2 className="section-title">👨‍🍳 Kökvy</h2>

      {loading && <p>Laddar…</p>}
      {err && <p style={{color:"crimson"}}>{err}</p>}

      {!loading && !err && orders.length === 0 && (
        <p>Inga öppna beställningar.</p>
      )}

      <div className="list" style={{ marginTop: 12 }}>
        {orders.map((o, i) => (
          <div key={o._id} className="list-item">
            <div>
              <div style={{ fontWeight: 600 }}>
                Order #{i + 1} – {o.product || o.title || "Okänd produkt"}
              </div>
              <div style={{ marginTop: 4 }}>
                <span className="badge badge-warning">Status: {o.status || "okänd"}</span>
              </div>
            </div>
            <button className="btn btn-success" onClick={() => markDone(o._id)}>
              ✓ Klar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
