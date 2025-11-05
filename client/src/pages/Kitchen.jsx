import React from "react";
export default function Kitchen() {
  return (
    <div className="container mt-4">
      <h3 className="mb-3">👨‍🍳 Kökvy</h3>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Order #12 – Toast & Latte
          <button className="btn btn-success btn-sm">Klar</button>
        </li>
      </ul>
    </div>
  );
}
