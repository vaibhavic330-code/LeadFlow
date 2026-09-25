import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await API.post(
        "/auth/register",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/dashboard");

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* NAVBAR */}
      <nav className="auth-navbar">

        <Link
          to="/"
          className="auth-brand"
        >

          <div className="auth-brand-icon">
            L
          </div>

          <div>
            <strong>LeadFlow</strong>

            <span>
              Smart Lead Management
            </span>
          </div>

        </Link>


        <div className="auth-nav-links">

          <Link to="/">
            Home
          </Link>

          <a href="/#features">
            Features
          </a>

          <a href="/#about">
            About
          </a>

          <a href="/#founder">
            Founder
          </a>

          <Link
            to="/login"
            className="auth-nav-login"
          >
            Login
          </Link>

        </div>

      </nav>


      {/* REGISTER */}
      <div className="auth-container">

        <div className="auth-card">

          <div className="auth-logo">

            <div className="logo-icon">
              L
            </div>

            <div>
              <h1>LeadFlow</h1>

              <p>
                Smart Lead Management
              </p>
            </div>

          </div>


          <h2>
            Create Your Account 🚀
          </h2>

          <p className="auth-description">
            Start managing your business leads
            in one organized workspace.
          </p>


          {error && (
            <div className="error-message">
              {error}
            </div>
          )}


          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                minLength="6"
                required
              />

            </div>


            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create LeadFlow Account →"}
            </button>

          </form>


          <div className="auth-divider">
            <span>Already using LeadFlow?</span>
          </div>


          <div className="auth-footer">

            <Link to="/login">
              Login to your account
            </Link>

          </div>


          <div className="auth-security">
            🔒 Your information is securely
            handled by LeadFlow.
          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;