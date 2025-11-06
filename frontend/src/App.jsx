import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import RobotDashboard from "./pages/RobotDashboard";
import CookerDashboard from "./pages/CookerDashboard";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import GoogleSuccess from "./pages/GoogleSuccess";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/google-success" element={<GoogleSuccess />} />

          {/* Role Dashboards */}
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
          <Route
            path="/cooker"
            element={
              <ProtectedRoute roles={["cooker"]}>
                <CookerDashboard />
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
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
