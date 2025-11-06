// 📁 src/pages/GoogleSuccess.jsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GoogleSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const token = params.get("token");
    const role = params.get("role");
    const fullname = params.get("fullname");
    const email = params.get("email");

    console.log("🧭 Received from backend:", { token, role, fullname, email });

    if (token) {
      // ✅ Store token and user in localStorage
      const user = { fullname, email, role };
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      console.log("✅ Token saved:", token);

      // ✅ Redirect user based on role
      switch (role) {
        case "admin":
          navigate("/admin");
          break;
        case "manager":
          navigate("/manager");
          break;
        case "robot":
          navigate("/robot");
          break;
        case "cooker":
          navigate("/cooker");
          break;
        default:
          navigate("/user");
      }
    } else {
      alert("❌ No token received from Google");
      navigate("/login");
    }
  }, [navigate, params, setUser]);

  return <p>Signing you in via Google...</p>;
};

export default GoogleSuccess;
