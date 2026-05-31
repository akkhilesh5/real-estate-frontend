import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();
  
  // 📜 ALIGNED KEY NAMES: Matches RegisterUserDto fields exactly
  const [formData, setFormData] = useState({ 
    userName: "", 
    userEmail: "", 
    userPassword: "", 
    role: "USER" 
  });
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await registerUser(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Registration Failure:", err);
      setError(err.response?.data?.message || err.response?.data || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "85vh" }}>
      <div className="card border-0 shadow p-4 mx-auto w-100" style={{ maxWidth: "480px", borderRadius: "15px" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark">Create Account</h2>
          <p className="text-muted small">Join EstateHub to unlock premium realty options</p>
        </div>

        {error && <div className="alert alert-danger small py-2" role="alert">{error}</div>}
        {success && <div className="alert alert-success small py-2" role="alert">Account created successfully! Redirecting to login...</div>}

        <form onSubmit={handleSubmit}>
          {/* Full Name Input */}
          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">Full Name</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted"><FaUser /></span>
              <input 
                type="text" 
                name="userName" // 👈 Matches RegisterUserDto field 'userName'
                className="form-control bg-light border-start-0" 
                placeholder="Akhil"
                value={formData.userName} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          {/* Email Address Input */}
          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted"><FaEnvelope /></span>
              <input 
                type="email" 
                name="userEmail" // 👈 Matches RegisterUserDto field 'userEmail'
                className="form-control bg-light border-start-0" 
                placeholder="akhil@gmail.com"
                value={formData.userEmail} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted"><FaLock /></span>
              <input 
                type="password" 
                name="userPassword" // 👈 Matches RegisterUserDto field 'userPassword'
                className="form-control bg-light border-start-0" 
                placeholder="••••••••"
                value={formData.userPassword} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          {/* Profile Role Selector */}
          <div className="mb-4">
            <label className="form-label small fw-semibold text-secondary">Account Profile Type</label>
            <select name="role" className="form-select bg-light" value={formData.role} onChange={handleChange}>
              <option value="USER">Regular Buyer / Tenant</option>
              <option value="AGENT">Real Estate Agent / Broker</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="btn w-100 text-white fw-bold mb-3"
            style={{ background: "linear-gradient(90deg, #00B4A6, #17C964)", borderRadius: "8px", padding: "10px", border: "none" }}
          >
            {loading ? "Registering Account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-2">
          <p className="small text-muted mb-0">
            Already have an account? <Link to="/login" className="fw-semibold text-decoration-none" style={{ color: "#031B3A" }}>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;