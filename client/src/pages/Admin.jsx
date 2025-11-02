import React from "react";
export default function Admin() {
  return (
    <div className="container mt-4">
      <h3 className="mb-3">🧑‍💼 Adminpanel</h3>
      <table className="table">
        <thead><tr><th>Namn</th><th>E-post</th><th>Roll</th><th>Åtgärder</th></tr></thead>
        <tbody>
          <tr><td>Elijah</td><td>elijah@botify.se</td><td>Manager</td><td><button className="btn btn-outline-danger btn-sm">Ta bort</button></td></tr>
        </tbody>
      </table>
    </div>
  );
}
