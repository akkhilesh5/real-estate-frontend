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
      className="navbar navbar-expand-lg navbar-dark px-3 px-md-5"
      style={{
        background: "linear-gradient(90deg, #031B3A, #072B55)",
        paddingTop: "15px",
        paddingBottom: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      <div className="container-fluid p-0 d-flex align-items-center justify-content-between w-100">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center m-0" to="/">
          <Logo />
        </Link>

        {/* 🍔 Mobile Hamburger Toggle Button */}
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbarMenu"
          aria-controls="mainNavbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ border: "1px solid rgba(255,255,255,0.2)" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 📦 Collapsible Navbar Menu Wrapper */}
        <div className="collapse navbar-collapse" id="mainNavbarMenu">
          <div className="navbar-nav ms-auto align-items-lg-center gap-3 gap-lg-4 pt-3 pt-lg-0">
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
              <div className="dropdown mt-2 mt-lg-0">
                <button
                  className="btn btn-outline-light dropdown-toggle px-3 py-2 w-100 text-start text-lg-center"
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
                  
                  <li>
                    <Link className="dropdown-item py-2 fw-medium" style={{ color: "#00B4A6" }} to="/add-property">
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
              <div className="d-flex flex-column flex-lg-row gap-2 mt-2 mt-lg-0">
                <Link
                  to="/login"
                  className="btn text-white text-center"
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
                  className="btn text-white text-center"
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
              </div>
            )}
          </div>
        </div>
      </div>
    </nav> 
  ); 
}

export default Navbar;