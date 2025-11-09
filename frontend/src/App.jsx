// 📁 frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

// 🧭 Auth Context
import { useAuth } from "./context/AuthContext";

// 🧩 Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GoogleSuccess from "./pages/GoogleSuccess";

// 🧩 Role-Based Dashboards
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import RobotDashboard from "./pages/RobotDashboard";
import Kitchen from "./pages/Kitchen"; // ✅ our functional cooker dashboard
import UserDashboard from "./pages/UserDashboard";

// 🧩 Auth Protection
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* 🏠 Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/google-success" element={<GoogleSuccess />} />

          {/* 🧩 Role Dashboards */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager"
            element={
              <ProtectedRoute roles={["manager"]}>
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/robot"
            element={
              <ProtectedRoute roles={["robot"]}>
                <RobotDashboard />
              </ProtectedRoute>
            }
          />

          {/* ✅ Cooker Dashboard (Kitchen.jsx) */}
          <Route
            path="/cooker"
            element={
              <ProtectedRoute roles={["cooker"]}>
                <Kitchen />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user"
            element={
              <ProtectedRoute roles={["user"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* ❌ Catch-all route for 404s */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
