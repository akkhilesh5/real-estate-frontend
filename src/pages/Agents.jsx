import { useEffect, useState } from "react";
import { getAllAgents } from "../services/api"; 
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaExclamationTriangle } from "react-icons/fa";

function Agents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllAgents()
      .then((response) => {
        // Automatically handle raw lists or paginated content block formats
        const dataArray = Array.isArray(response.data) ? response.data : response.data?.content || [];
        setAgents(dataArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Full Agent Network Error Context:", err);
        const status = err.response?.status;
        const statusText = err.response?.statusText || "";
        
        let customErrorMessage = `Failed to load agent directory.`;
        if (status) {
          customErrorMessage += ` (HTTP ${status} ${statusText})`;
        } else {
          customErrorMessage += ` - Network connection failure or server down.`;
        }
        
        setError(customErrorMessage);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center py-5">
        <div className="spinner-border" role="status" style={{ color: "#00B4A6" }}></div>
        <h4 className="mt-3 text-muted">Connecting with premium brokers...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center py-5 text-dark">
        <div className="alert alert-danger mx-auto d-flex align-items-center justify-content-center gap-2" style={{ maxWidth: "650px" }}>
          <FaExclamationTriangle />
          <span>{error}</span>
        </div>
        <p className="text-muted small mt-2">Verify that your backend Spring Boot service is active on port 8080.</p>
      </div>
    );
  }

  return (
    <div className="container my-5 text-dark">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Meet Our Verified Real Estate Advisors</h2>
        <p className="text-muted">Certified industry professionals dedicated to guiding your property investments smoothly</p>
      </div>

      {agents.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted fs-5">No real estate agents are currently listed in the corporate index.</p>
        </div>
      ) : (
        <div className="row g-4">
          {agents.map((agent, index) => {
            // Defensive fallbacks to read whatever your AgentDto variables are named
            const id = agent.agentId || agent.id || index;
            const name = agent.agentName || agent.name || "Authorized Broker";
            const city = agent.agentCity || agent.city || "Indore";
            const country = agent.agentCountry || agent.country || "India";
            const email = agent.agentEmail || agent.email || "agent@estatehub.com";
            const phone = agent.agentPhone || agent.phone || "+91 731 245 0000";
            const specialization = agent.specialization || "Premium Consultant";

            return (
              <div key={id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm bg-white" style={{ borderRadius: "15px", overflow: "hidden" }}>
                  
                  {/* Agent Visual Header */}
                  <div className="p-4 text-center border-bottom bg-light">
                    <div className="mx-auto mb-3 rounded-circle border border-3 d-flex align-items-center justify-content-center bg-white shadow-sm" 
                         style={{ width: "110px", height: "110px", borderColor: "#00B4A6" }}>
                      <span className="fs-1">👤</span>
                    </div>
                    <h5 className="fw-bold text-dark mb-1">{name}</h5>
                    <span className="badge bg-dark px-3 py-1 rounded-pill small">
                      {specialization}
                    </span>
                  </div>

                  {/* Body Content Details */}
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex flex-column gap-3 mb-4 small text-secondary">
                      <div className="d-flex align-items-center gap-2">
                        <FaMapMarkerAlt className="text-muted" />
                        <span><strong>Location:</strong> {city}, {country}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 text-truncate">
                        <FaEnvelope className="text-danger" />
                        <span>{email}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <FaPhoneAlt className="text-success" />
                        <span>{phone}</span>
                      </div>
                    </div>

                    <a 
                      href={`mailto:${email}?subject=Property Investment Inquiry`}
                      className="btn w-100 text-white mt-auto fw-semibold py-2"
                      style={{ background: "linear-gradient(90deg, #031B3A, #00B4A6)", borderRadius: "8px", border: "none" }}
                    >
                      Send Direct Message
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Agents;