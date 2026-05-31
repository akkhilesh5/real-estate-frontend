import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";

function Navbar() {
  const navigate = useNavigate();
  
  // 🔐 Check if the authentication token exists in localStorage
  const isLoggedIn = localStorage.getItem("token");

  // 🚪 Clear token from session storage and redirect the user
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload(); // Instantly clears navbar states across the app
  };

  return (
    <nav
      className="navbar navbar-expand-lg px-5"
      style={{
        background: "linear-gradient(90deg, #031B3A, #072B55)",
        paddingTop: "15px",
        paddingBottom: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      {/* Logo */}
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <Logo />
      </Link>

      {/* Navbar Menu */}
      <div className="navbar-nav ms-auto d-flex align-items-center gap-4">
        <Link className="nav-link text-white fw-semibold" to="/">
          Home
        </Link>

        <Link className="nav-link text-white fw-semibold" to="/properties">
          Properties
        </Link>

        <Link className="nav-link text-white fw-semibold" to="/agents">
          Agents
        </Link>

        <Link className="nav-link text-white fw-semibold" to="/about">
          About Us
        </Link>

        <Link className="nav-link text-white fw-semibold" to="/contact">
          Contact
        </Link>

        {/* Dynamic Action Buttons based on User Auth Session State */}
        {isLoggedIn ? (
          /* Clean Profile Dropdown replaces Login/Register buttons when authenticated */
          <div className="dropdown">
            <button
              className="btn btn-outline-light dropdown-toggle px-3 py-2"
              type="button"
              id="userMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ borderRadius: "8px" }}
            >
              👤 My Account
            </button>
            
            <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2" aria-labelledby="userMenu">
              <li>
                <Link className="dropdown-item py-2 fw-medium" to="/dashboard">
                  📊 Dashboard Overview
                </Link>
              </li>
              
              {/* ✨ NEW ADD PROPERTY LINK INTEGRATED HERE */}
              <li>
                <Link className="dropdown-item py-2 fw-medium text-teal" style={{ color: "#00B4A6" }} to="/add-property">
                  ➕ Add New Property
                </Link>
              </li>

              <li>
                <Link className="dropdown-item py-2 fw-medium" to="/transactions">
                  💳 Transaction History
                </Link>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item py-2 text-danger fw-bold" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          /* Standard Login/Register Links show when logged out */
          <>
            <Link
              to="/login"
              className="btn text-white"
              style={{
                border: "1px solid white",
                padding: "8px 20px",
                borderRadius: "8px",
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn text-white"
              style={{
                background: "linear-gradient(90deg, #00B4A6, #17C964)",
                padding: "8px 20px",
                borderRadius: "8px",
                fontWeight: "500",
                border: "none",
              }}
            >
              Register
            </Link>
          </>
        )}
      </div> 
    </nav> 
  ); 
}

export default Navbar;