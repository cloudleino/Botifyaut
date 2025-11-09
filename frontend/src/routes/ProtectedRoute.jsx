// 📁 frontend/src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ roles, children }) {
  const { user, loading } = useAuth();

  // ⏳ Wait while AuthContext loads
  if (loading) return <p className="text-center mt-5">Loading...</p>;

  // ❌ Not logged in → go to login
  if (!user) return <Navigate to="/login" replace />;

  // 🚫 Logged in but wrong role
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // ✅ User has correct role
  return children;
}
