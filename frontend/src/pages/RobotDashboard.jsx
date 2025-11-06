import { useAuth } from "../context/AuthContext";

const RobotDashboard = () => {
  const { user } = useAuth();
  return (
    <div style={{ padding: "40px" }}>
      <h1>🤖 Robot Dashboard</h1>
      <p>Hello {user?.fullname}, ready to handle automation tasks?</p>
    </div>
  );
};

export default RobotDashboard;
