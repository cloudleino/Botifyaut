import { useAuth } from "../context/AuthContext";

const CookerDashboard = () => {
  const { user } = useAuth();
  return (
    <div style={{ padding: "40px" }}>
      <h1>👨‍🍳 Cooker Dashboard</h1>
      <p>Hi {user?.fullname}, here are your active orders:</p>
    </div>
  );
};

export default CookerDashboard;
