import React from "react";

export default function Admin() {
  return (
    <div className="admin-page container-fluid py-4 px-3 px-md-4">
      <h3 className="mb-3">🧑‍💼 Adminpanel</h3>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-2 p-md-3">
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Namn</th>
                  <th>E-post</th>
                  <th>Roll</th>
                  <th className="text-end">Åtgärder</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Elijah</td>
                  <td className="text-break">elijah@botify.se</td>
                  <td><span className="badge bg-info text-dark">Manager</span></td>
                  <td className="text-end">
                    <button className="btn btn-outline-danger btn-sm">Ta bort</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
