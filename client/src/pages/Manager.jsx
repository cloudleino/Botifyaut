import React from "react";
export default function Manager() {
  return (
    <div className="container mt-4">
      <h2 className="text-dark mb-3">💼 Manager Dashboard</h2>
      <div className="row g-3">
        <div className="col-md-4"><div className="card text-center shadow-sm"><div className="card-body"><h6>Aktiva beställningar</h6><h3>32</h3></div></div></div>
        <div className="col-md-4"><div className="card text-center shadow-sm"><div className="card-body"><h6>Robotar aktiva</h6><h3>7</h3></div></div></div>
        <div className="col-md-4"><div className="card text-center shadow-sm"><div className="card-body"><h6>Totala intäkter</h6><h3>15 800 kr</h3></div></div></div>
      </div>
    </div>
  );
}
