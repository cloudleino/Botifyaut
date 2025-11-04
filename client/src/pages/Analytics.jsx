import React, { useEffect, useState } from "react";

export default function Analytics() {
  const [data, setData] = useState({ orders: 0, revenue: 0, robots: 0, users: 0 });

  useEffect(() => {
    fetch("http://localhost:5000/api/analytics/summary")
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-dark">
        <span role="img" aria-label="chart">📊</span> Analytics Dashboard
      </h3>

      <div className="row g-4">
        <div className="col-md-3 col-6">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6 className="text-secondary">Orders</h6>
              <h3 className="fw-bold">{data.orders}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-6">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6 className="text-secondary">Revenue</h6>
              <h3 className="fw-bold">{data.revenue} kr</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-6">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6 className="text-secondary">Active Robots</h6>
              <h3 className="fw-bold">{data.robots}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-6">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6 className="text-secondary">Users</h6>
              <h3 className="fw-bold">{data.users}</h3>
            </div>
          </div>
        </div>
      </div>

      <p className="text-secondary mt-4 text-center">
        Diagram kommer här (Chart.js)
      </p>
    </div>
  );
}
