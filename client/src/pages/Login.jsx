import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: koppla till API
    console.log({ email, pwd });
  };

  return (
    <div className="login-wrap">
      <div className="login-card shadow-lg rounded-4 p-4 p-md-5">
        {/* Logo + Brand */}
        <div className="d-flex align-items-center gap-3 mb-3">
          <img
            src="/loggabot1.png"
            alt="Botify logo"
            style={{ width: 56, height: 56, borderRadius: "50%", boxShadow: "0 0 10px #00BFFF" }}
          />
          <h1 className="m-0 fw-bold" style={{ color: "#EAF2FB", textShadow: "0 0 6px rgba(0,191,255,.5)" }}>
            BOTIFY
          </h1>
        </div>

        {/* Title */}
        <h2 className="fw-bold text-white mb-4 display-6">Welcome</h2>

        {/* Form */}
        <form onSubmit={onSubmit} className="d-grid gap-3">
          <div>
            <label htmlFor="email" className="form-label text-light-50">Email</label>
            <input
              id="email"
              type="email"
              className="form-control form-control-lg login-input w-100"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="pwd" className="form-label text-light-50">Password</label>
            <input
              id="pwd"
              type="password"
              className="form-control form-control-lg login-input w-100"
              placeholder="Password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-lg btn-primary login-cta w-100 mt-2">
            Log In
          </button>

          <div className="text-center mt-2">
            <span className="text-light-60 me-1">Don’t have an account?</span>
            <a href="/signup" className="link-signup">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
}
