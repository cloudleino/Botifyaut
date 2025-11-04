import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Fel vid hämtning:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">📦 Mina beställningar</h3>
      <table className="table table-striped">
        <thead>
          <tr><th>#</th><th>Produkt</th><th>Status</th><th>Datum</th></tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr key={o._id}>
              <td>{i + 1}</td>
              <td>{o.product}</td>
              <td><span className="badge bg-success">{o.status}</span></td>
              <td>{new Date(o.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary">Lägg ny order</button>
    </div>
  );
}

