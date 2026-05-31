import { FaBuilding, FaHandshake, FaAward, FaUsers } from "react-icons/fa";

function About() {
  return (
    <div className="container mt-5 mb-5">
      {/* Hero Header Section */}
      <div className="text-center mb-5 py-4">
        <h1 className="fw-bold text-dark mb-2">About Our Platform</h1>
        <p className="text-muted mx-auto fs-5" style={{ maxWidth: "700px" }}>
          Redefining the real estate ecosystem by connecting clients with premium properties and verified agents through seamless technology.
        </p>
        <hr className="mx-auto" style={{ width: "60px", height: "3px", backgroundColor: "#00B4A6", opacity: "1" }} />
      </div>

      {/* Main Vision Content Split */}
      <div className="row g-5 align-items-center mb-5">
        <div className="col-12 col-md-6">
          <h2 className="fw-bold mb-3" style={{ color: "#031B3A" }}>Our Purpose & Vision</h2>
          <p className="text-secondary leading-relaxed">
            Founded with a vision to eliminate friction from property acquisition, our marketplace serves as a trusted bridge for buyers, renters, and professional agents. We combine database integrity with modern design configurations to deliver premium real estate options.
          </p>
          <p className="text-secondary">
            Whether you are expanding your business footprint with commercial real estate listings or establishing your family home, our platform ensures verifiable data tracking and complete transaction security at every stage.
          </p>
        </div>
        <div className="col-12 col-md-6">
          {/* Aesthetic geometric visual box mimicking a corporate image layout */}
          <div className="p-5 rounded-3 text-white text-center shadow" style={{ background: "linear-gradient(135deg, #031B3A, #072B55)", minHeight: "250px" }}>
            <FaBuilding size={60} className="mb-3 text-teal" style={{ color: "#00B4A6" }} />
            <h3 className="fw-bold">Modern Spaces</h3>
            <p className="text-white-50 small mb-0">Bridging the gap between conceptual listings and actual key ownership tokens seamlessly.</p>
          </div>
        </div>
      </div>

      {/* Core Values Grid */}
      <h3 className="fw-bold text-center mb-4" style={{ color: "#031B3A" }}>Our Core Pillars</h3>
      <div className="row g-4">
        {/* Pillar 1 */}
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100 text-center" style={{ borderRadius: "12px" }}>
            <div className="p-3 bg-light rounded-circle mx-auto mb-3 text-primary" style={{ width: "60px", height: "60px" }}>
              <FaHandshake size={28} />
            </div>
            <h5 className="fw-bold text-dark">Absolute Integrity</h5>
            <p className="text-muted small mb-0">Every listing on our ecosystem goes through severe backend auditing and verification checks.</p>
          </div>
        </div>
        {/* Pillar 2 */}
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100 text-center" style={{ borderRadius: "12px" }}>
            <div className="p-3 bg-light rounded-circle mx-auto mb-3 text-success" style={{ width: "60px", height: "60px" }}>
              <FaAward size={28} />
            </div>
            <h5 className="fw-bold text-dark">Premium Quality</h5>
            <p className="text-muted small mb-0">We curate real estate assets across strategic zones to maximize investment returns.</p>
          </div>
        </div>
        {/* Pillar 3 */}
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100 text-center" style={{ borderRadius: "12px" }}>
            <div className="p-3 bg-light rounded-circle mx-auto mb-3" style={{ width: "60px", height: "60px", color: "#00B4A6" }}>
              <FaUsers size={28} />
            </div>
            <h5 className="fw-bold text-dark">Expert Representation</h5>
            <p className="text-muted small mb-0">Our connected network of agents hold industry status certificates to ensure expert guidance.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;