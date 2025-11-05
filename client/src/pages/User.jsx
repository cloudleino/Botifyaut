import React from "react";
export default function User() {
  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title">👤 Min profil</h3>
          <p className="text-muted mb-2">Namn: Catta Leino</p>
          <p className="text-muted">E-post: example@botify.se</p>
          <button className="btn btn-outline-dark">Redigera</button>
        </div>
      </div>
    </div>
  );
}
