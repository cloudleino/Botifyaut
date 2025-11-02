import React from "react";

export default function Analytics() {
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
              <h3 className="fw-bold">58</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6 className="text-secondary">Revenue</h6>
              <h3 className="fw-bold">12 450 kr</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6 className="text-secondary">Active Robots</h6>
              <h3 className="fw-bold">7</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6 className="text-secondary">Users</h6>
              <h3 className="fw-bold">21</h3>
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
