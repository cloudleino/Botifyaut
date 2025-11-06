import { useAuth } from "../context/AuthContext";

const UserDashboard = () => {
  const { user } = useAuth();
  return (
    <div style={{ padding: "40px" }}>
      <h1>👤 User Dashboard</h1>
      <p>Welcome {user?.fullname}! You can view your activities here.</p>
    </div>
  );
};

export default UserDashboard;
