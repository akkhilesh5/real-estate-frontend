import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from "react-icons/fa";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate frontend form ingestion handling
    console.log("Inquiry submitted successfully:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="container mt-5 mb-5">
      {/* Header text blocks */}
      <div className="text-center mb-5 py-2">
        <h1 className="fw-bold text-dark mb-2">Get in Touch</h1>
        <p className="text-muted mx-auto fs-5" style={{ maxWidth: "600px" }}>
          Have questions about a property listing or transaction? Reach out to our assistance channels.
        </p>
      </div>

      <div className="row g-5">
        {/* Left Column: Interactive Input Form Wrapper */}
        <div className="col-12 col-md-7">
          <div className="card p-4 border-0 shadow-sm" style={{ borderRadius: "15px" }}>
            <h4 className="fw-bold mb-4 text-dark">Send an Inquiry</h4>
            
            {submitted && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                ✨ <strong>Message Dispatched!</strong> Our support desk will reach out shortly.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold text-secondary">Full Name</label>
                  <input
                    type="text"
                    required
                    className="form-control py-2"
                    placeholder="Enter full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold text-secondary">Email Address</label>
                  <input
                    type="email"
                    required
                    className="form-control py-2"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-bold text-secondary">Subject</label>
                  <input
                    type="text"
                    required
                    className="form-control py-2"
                    placeholder="Listing Inquiry, Account Assistance..."
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-bold text-secondary">Message Details</label>
                  <textarea
                    rows="5"
                    required
                    className="form-control"
                    placeholder="Type your message description here..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  ></textarea>
                </div>
                <div className="col-12 mt-4">
                  <button type="submit" className="btn text-white w-100 py-2 fw-medium d-flex align-items-center justify-content-center gap-2" style={{ backgroundColor: "#031B3A", borderRadius: "8px" }}>
                    <FaPaperPlane size={14} /> Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Office Address Contact Information Block */}
        <div className="col-12 col-md-5 d-flex flex-column justify-content-between">
          <div className="p-4 bg-white border shadow-sm w-100 mb-4" style={{ borderRadius: "15px" }}>
            <h4 className="fw-bold mb-4 text-dark">Contact Information</h4>
            
            <div className="d-flex align-items-start gap-3 mb-4">
              <div className="p-2 rounded bg-light text-primary mt-1">
                <FaMapMarkerAlt size={18} />
              </div>
              <div>
                <h6 className="fw-bold mb-1 text-dark">Corporate Office</h6>
                <p className="text-muted small mb-0">101, Business Park, AB Road, Indore, MP, India</p>
              </div>
            </div>

            <div className="d-flex align-items-start gap-3 mb-4">
              <div className="p-2 rounded bg-light text-success mt-1">
                <FaPhoneAlt size={16} />
              </div>
              <div>
                <h6 className="fw-bold mb-1 text-dark">Phone Helpline</h6>
                <p className="text-muted small mb-0">+91 731 245 0000</p>
              </div>
            </div>

            <div className="d-flex align-items-start gap-3 mb-2">
              <div className="p-2 rounded bg-light mt-1" style={{ color: "#00B4A6" }}>
                <FaEnvelope size={16} />
              </div>
              <div>
                <h6 className="fw-bold mb-1 text-dark">Email Correspondence</h6>
                <p className="text-muted small mb-0">support@realestateapp.com</p>
              </div>
            </div>
          </div>

          {/* Prompt banner container */}
          <div className="p-4 text-white rounded-3 shadow-sm w-100" style={{ background: "linear-gradient(135deg, #00B4A6, #17C964)" }}>
            <h5 className="fw-bold mb-1">Looking for immediate placement?</h5>
            <p className="small mb-0 opacity-75">Registered real estate agents are online inside the active profiles section to field structural property chats directly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;