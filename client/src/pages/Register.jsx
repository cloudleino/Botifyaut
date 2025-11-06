import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/register', formData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // Dispatch auth-change event
        window.dispatchEvent(new Event('auth-change'));
        navigate('/analytics');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
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
        <h2 className="fw-bold text-white mb-4 display-6">Create Account</h2>

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="d-grid gap-3">
          <div>
            <label className="form-label text-light-50">Username</label>
            <input
              type="text"
              className="form-control form-control-lg login-input w-100"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="form-label text-light-50">Full Name</label>
            <input
              type="text"
              className="form-control form-control-lg login-input w-100"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={(e) => setFormData({...formData, fullname: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="form-label text-light-50">Email</label>
            <input
              type="email"
              className="form-control form-control-lg login-input w-100"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="form-label text-light-50">Password</label>
            <input
              type="password"
              className="form-control form-control-lg login-input w-100"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="btn btn-lg btn-primary login-cta w-100 mt-2">
            Register
          </button>

          <div className="mt-3 text-center text-white">
            Already have an account? <Link to="/login" className="text-info">Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;