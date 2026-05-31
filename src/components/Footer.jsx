import { Link } from "react-router-dom";
import { FaBuilding, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="text-white pt-5 pb-4 mt-auto"
      style={{ 
        background: "linear-gradient(180deg, #031B3A, #021124)",
        borderTop: "3px solid #00B4A6",
        boxShadow: "0 -4px 12px rgba(0,0,0,0.15)"
      }}
    >
      <div className="container text-md-start text-center">
        <div className="row g-4">
          
          {/* Column 1: Brand & Description */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold mb-3 d-flex align-items-center justify-content-center justify-content-md-start gap-2">
              <FaBuilding style={{ color: "#00B4A6" }} /> 
              <span style={{ letterSpacing: "1px" }}>REALESTATE<span style={{ color: "#00B4A6" }}>APP</span></span>
            </h5>
            <p className="small text-white-50" style={{ lineHeight: "1.6" }}>
              Simplifying the real estate journey. We offer a modern full-stack infrastructure to browse premium assets, track active transactions, and connect with certified industry professionals safely.
            </p>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start mt-3">
              <a href="#" className="text-white-50 hover-teal" style={{ transition: "color 0.2s" }}><FaFacebook size={18} /></a>
              <a href="#" className="text-white-50 hover-teal" style={{ transition: "color 0.2s" }}><FaTwitter size={18} /></a>
              <a href="#" className="text-white-50 hover-teal" style={{ transition: "color 0.2s" }}><FaLinkedin size={18} /></a>
            </div>
          </div>

          {/* Column 2: Quick Links Navigation */}
          <div className="col-12 col-md-4 mx-auto ps-md-5">
            <h6 className="text-uppercase fw-bold mb-3" style={{ color: "#00B4A6", fontSize: "14px", letterSpacing: "1px" }}>
              Quick Navigation
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to="/" className="text-white-50 text-decoration-none hover-white">Home Marketplace</Link></li>
              <li><Link to="/properties" className="text-white-50 text-decoration-none hover-white">Premium Properties</Link></li>
              <li><Link to="/agents" className="text-white-50 text-decoration-none hover-white">Verified Agents</Link></li>
              <li><Link to="/about" className="text-white-50 text-decoration-none hover-white">Our Corporate Story</Link></li>
              <li><Link to="/contact" className="text-white-50 text-decoration-none hover-white">Support & Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Support Info */}
          <div className="col-12 col-md-4">
            <h6 className="text-uppercase fw-bold mb-3" style={{ color: "#00B4A6", fontSize: "14px", letterSpacing: "1px" }}>
              Corporate HQ
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small text-white-50">
              <li className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
                <FaMapMarkerAlt size={12} className="text-teal" style={{ color: "#00B4A6" }} /> 101, Business Park, AB Road, Indore, MP
              </li>
              <li className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
                <FaPhoneAlt size={12} /> +91 731 245 0000
              </li>
              <li className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
                <FaEnvelope size={12} /> support@realestateapp.com
              </li>
              <li className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
                <FaGlobe size={12} /> www.realestateapp.com
              </li>
            </ul>
          </div>

        </div>

        <hr className="my-4" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />

        {/* Copyright Footer Row */}
        <div className="row align-items-center small text-white-50">
          <div className="col-12 col-md-6 text-center text-md-start mb-2 mb-md-0">
            © {currentYear} RealEstateApp Enterprise. All Rights Reserved.
          </div>
          <div className="col-12 col-md-6 text-center text-md-end">
            <a href="#" className="text-white-50 text-decoration-none me-3 hover-white">Privacy Policy</a>
            <a href="#" className="text-white-50 text-decoration-none hover-white">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Embedded Global CSS Hover Styles */}
      <style>{`
        .hover-teal:hover { color: #00B4A6 !important; }
        .hover-white:hover { color: #ffffff !important; transition: color 0.2s ease; }
      `}</style>
    </footer>
  );
}

export default Footer;