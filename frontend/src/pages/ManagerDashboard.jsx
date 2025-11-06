import { useAuth } from "../context/AuthContext";

const ManagerDashboard = () => {
  const { user } = useAuth();
  return (
    <div style={{ padding: "40px" }}>
      <h1>🧭 Manager Dashboard</h1>
      <p>Welcome, {user?.fullname}</p>
      <ul>
        <li>📋 Manage team reports</li>
        <li>🧑‍💻 Assign tasks to robots or cookers</li>
      </ul>
    </div>
  );
};

export default ManagerDashboard;
