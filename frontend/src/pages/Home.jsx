import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const roles = [
    { name: "Admin", path: "/admin", color: "#e74c3c" },
    { name: "Manager", path: "/manager", color: "#3498db" },
    { name: "Robot", path: "/robot", color: "#9b59b6" },
    { name: "Cooker", path: "/cooker", color: "#f1c40f" },
    { name: "User", path: "/user", color: "#2ecc71" },
  ];

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>🤖 Botify System</h1>
      <p style={{ fontSize: "18px", marginBottom: "30px" }}>
        {user
          ? `Welcome, ${user.fullname}! You are logged in as ${user.role}.`
          : "Please login or register to continue."}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {roles.map((role) => (
          <button
            key={role.name}
            onClick={() =>
              user ? navigate(role.path) : alert("Please login first!")
            }
            style={{
              background: role.color,
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              minWidth: "130px",
            }}
          >
            {role.name} Dashboard
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
