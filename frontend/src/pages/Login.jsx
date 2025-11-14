import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setUser } = useAuth();

    // 🔐 Manual Login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/api/auth/login", {
                email,
                password,
            });
            let { token, user } = res.data;

            // ✅ Assign dedicated role for a specific email
            const specialRoles = {
                "xyz@gmail.com": "robot",
                // You can add more special emails & roles here
            };
            if (specialRoles[user.email]) {
                user.role = specialRoles[user.email];
            }

            // Save user and token
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);

            // Redirect based on role
            navigate(`/${user.role}`);
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    // 🔵 Google OAuth2 Login
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:5001/api/auth/google";
    };

    return (
        <div className="login-wrap">
            <div className="login-card shadow-lg rounded-4 p-4 p-md-5">
                {/* BOTIFY logo + brand name */}
                <div className="d-flex align-items-center gap-3 mb-3 justify-content-center">
                    <img
                        src="/loggabot1.png"
                        alt="Botify logo"
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: "50%",
                            boxShadow: "0 0 10px #00BFFF",
                        }}
                    />
                    <h1
                        className="fw-bold"
                        style={{
                            color: "#EAF2FB",
                            textShadow: "0 0 6px rgba(0,191,255,.5)",
                        }}
                    >
                        BOTIFY
                    </h1>
                </div>

                <h2 className="fw-bold text-white mb-4 display-6 text-center">
                    Welcome Back
                </h2>

                {/* Error Message */}
                {error && (
                    <div className="alert alert-danger text-center" role="alert">
                        {error}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin} className="d-grid gap-3">
                    <input
                        className="form-control form-control-lg login-input w-100"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="form-control form-control-lg login-input w-100"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="btn btn-lg btn-primary w-100 mt-2"
                    >
                        Login
                    </button>

                    <div className="mt-3 text-center text-white">or</div>

                    {/* Google OAuth Button */}
                    <button
                        onClick={handleGoogleLogin}
                        type="button"
                        className="btn btn-outline-light w-100"
                    >
                        <img
                            src="https://www.svgrepo.com/show/355037/google.svg"
                            alt="Google icon"
                            style={{ width: 22, marginRight: 8 }}
                        />
                        Sign in with Google
                    </button>
                </form>

                {/* Register Button */}
                <div className="mt-4 text-center text-white">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-info fw-bold">
                        Create one
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
