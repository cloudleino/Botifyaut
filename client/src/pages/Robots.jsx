// client/src/pages/Robots.jsx
import { useEffect, useMemo, useState } from "react";

const API_BASE =
  (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

export default function Robots() {
  const [robots, setRobots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const endpoint = useMemo(() => `${API_BASE}/api/robots`, []);

  // ===== Hämta robotar =====
  async function fetchRobots() {
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error(`GET ${res.status}`);
      const data = await res.json();
      setRobots(data);
    } catch (e) {
      console.error(e);
      setErr("Kunde inte hämta robotar.");
    } finally {
      setLoading(false);
    }
  }

  // ===== Lägg till robot =====
  async function addRobot() {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "PomBot", status: "Aktiv" }),
      });
      if (!res.ok) throw new Error(`POST ${res.status}`);
      const newRobot = await res.json();
      setRobots((prev) => [newRobot, ...prev]);
    } catch (e) {
      console.error(e);
      alert("Kunde inte lägga till robot.");
    }
  }

  // ===== Pausa robot =====
  async function pauseRobot(id) {
    try {
      const res = await fetch(`${endpoint}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Pausad" }),
      });
      if (!res.ok) throw new Error(`PUT ${res.status}`);
      const updated = await res.json();
      setRobots((prev) => prev.map((r) => (r._id === id ? updated : r)));
    } catch (e) {
      console.error(e);
      alert("Kunde inte pausa robot.");
    }
  }

  // ===== Ta bort robot =====
  async function removeRobot(id) {
    if (!confirm("Ta bort robot?")) return;
    try {
      const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`DELETE ${res.status}`);
      setRobots((prev) => prev.filter((r) => r._id !== id));
    } catch (e) {
      console.error(e);
      alert("Kunde inte ta bort robot.");
    }
  }

  useEffect(() => {
    fetchRobots();
  }, []);

  // ======= RENDER =======
  return (
    <div className="page">
      <h2 className="section-title">🤖 Robot-hantering</h2>

      <button className="btn btn-success" onClick={addRobot}>
        ➕ Lägg till robot
      </button>

      {loading && <p>Laddar...</p>}
      {err && <p style={{ color: "crimson" }}>{err}</p>}

      <div className="list" style={{ marginTop: 12 }}>
        {robots.map((r) => (
          <div key={r._id} className="list-item">
            <div>
              <strong>{r.name || "Robot"}</strong>
              <div style={{ marginTop: 4 }}>
                <span
                  className={`badge ${
                    r.status === "Aktiv"
                      ? "badge-active"
                      : r.status === "Pausad"
                      ? "badge-paused"
                      : "badge-offline"
                  }`}
                >
                  Status: {r.status || "okänd"}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                className="btn btn-warning"
                onClick={() => pauseRobot(r._id)}
              >
                ⏸️ Pausa
              </button>
              <button
                className="btn btn-danger"
                onClick={() => removeRobot(r._id)}
              >
                ❌ Ta bort
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
