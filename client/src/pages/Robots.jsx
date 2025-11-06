import React from "react";
export default function Robots() {
  return (
    <div className="container mt-4">
      <h3 className="mb-3">🤖 Robot-hantering</h3>
      <div className="card shadow-sm mb-3">
        <div className="card-body">
          <h5 className="card-title">PomBot</h5>
          <p className="text-muted">Status: Aktiv</p>
          <button className="btn btn-warning btn-sm me-2">Pausa</button>
          <button className="btn btn-outline-danger btn-sm">Ta bort</button>
        </div>
      </div>
      <button className="btn btn-success">➕ Lägg till robot</button>
    </div>
  );
}
