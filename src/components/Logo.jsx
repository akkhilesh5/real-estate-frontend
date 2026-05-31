import { FaHome } from "react-icons/fa";

function Logo() {
  return (
    <div className="d-flex align-items-center gap-2" style={{ userSelect: "none" }}>
      {/* Dynamic Graphic Icon Emblem */}
      <div 
        className="d-flex align-items-center justify-content-center position-relative shadow-sm"
        style={{
          width: "42px",
          height: "42px",
          background: "linear-gradient(135deg, #00B4A6, #17C964)",
          borderRadius: "12px",
        }}
      >
        {/* Subtle background tech circle accent */}
        <div 
          className="position-absolute" 
          style={{
            width: "28px",
            height: "28px",
            border: "2px solid rgba(255, 255, 255, 0.25)",
            borderRadius: "50%",
          }}
        />
        <FaHome className="text-white fs-4 position-relative" style={{ zIndex: 1 }} />
      </div>

      {/* Typography Brand Name */}
      <div className="d-flex flex-column lh-1">
        <span 
          className="fw-bold tracking-wide" 
          style={{ 
            fontSize: "22px", 
            color: "#FFFFFF",
            fontFamily: "'Poppins', 'Segoe UI', sans-serif",
            letterSpacing: "0.5px"
          }}
        >
          Estate<span style={{ color: "#00B4A6" }}>Hub</span>
        </span>
        <span 
          className="text-white-50 uppercase fw-medium" 
          style={{ 
            fontSize: "10px", 
            letterSpacing: "2px",
            marginTop: "2px"
          }}
        >
          PREMIUM REALTY
        </span>
      </div>
    </div>
  );
}

export default Logo;