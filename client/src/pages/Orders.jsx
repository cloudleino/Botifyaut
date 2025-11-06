import React from "react";
export default function Orders() {
  return (
    <div className="container mt-4">
      <h3 className="mb-3">📦 Mina beställningar</h3>
      <table className="table table-striped">
        <thead><tr><th>#</th><th>Produkt</th><th>Status</th><th>Datum</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Kaffe Latte</td><td><span className="badge bg-success">Klar</span></td><td>2025-11-02</td></tr>
        </tbody>
      </table>
      <button className="btn btn-primary">Lägg ny order</button>
    </div>
  );
}
