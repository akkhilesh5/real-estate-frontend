import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { FaLock, FaEnvelope } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  // 👇 UPDATED: Changed keys to match your LoginDto fields perfectly
  const [formData, setFormData] = useState({ userEmail: "", userPassword: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(formData);
      
      // Since your backend returns a plain ResponseEntity<String>, response.data will be the string response
      const token = response.data || "dummy-login-token";
      
      localStorage.setItem("token", token);
      
      navigate("/");
      window.location.reload(); 
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <div className="card border-0 shadow p-4 mx-auto w-100" style={{ maxWidth: "450px", borderRadius: "15px" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark">Welcome Back</h2>
          <p className="text-muted small">Login to manage your listings and enquiries</p>
        </div>

        {error && <div className="alert alert-danger small py-2" role="alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Email input field */}
          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted"><FaEnvelope /></span>
              <input 
                type="email" 
                name="userEmail" // 👈 MUST match your LoginDto property name
                className="form-control bg-light border-start-0" 
                placeholder="name@example.com"
                value={formData.userEmail} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          {/* Password input field */}
          <div className="mb-4">
            <label className="form-label small fw-semibold text-secondary">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted"><FaLock /></span>
              <input 
                type="password" 
                name="userPassword" // 👈 MUST match your LoginDto property name
                className="form-control bg-light border-start-0" 
                placeholder="••••••••"
                value={formData.userPassword} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-100 text-white fw-bold mb-3"
            style={{ background: "linear-gradient(90deg, #031B3A, #00B4A6)", borderRadius: "8px", padding: "10px" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-2">
          <p className="small text-muted mb-0">
            Don't have an account? <Link to="/register" className="fw-semibold text-decoration-none" style={{ color: "#00B4A6" }}>Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;