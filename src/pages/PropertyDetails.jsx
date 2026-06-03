import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaHeart,
  FaEnvelope,
  FaArrowLeft,
} from "react-icons/fa";
import { getPropertyById, sendInquiry } from "../services/api"; 

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (!id) return;
    getPropertyById(id)
      .then((response) => {
        setProperty(response.data);
      })
      .catch((error) => {
        console.error("Error fetching property details:", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null); 

    try {
      await sendInquiry({
        propertyId: id,
        ...contactForm,
      });
      setSubmitStatus({ success: true, msg: "Your message was sent successfully to the listing agent!" });
      setContactForm({ name: "", email: "", message: "" }); 
    } catch (error) {
      console.error("Inquiry submission failure:", error);
      setSubmitStatus({ success: false, msg: "Failed to dispatch message. Please check connection." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!property) {
    return (
      <div className="container mt-5 text-center py-5">
        <div className="spinner-border" role="status" style={{ color: "#00B4A6" }}></div>
        <h3 className="mt-3 text-muted">Loading property details...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5 text-dark">
      {/* Back Link */}
      <button 
        onClick={() => navigate("/properties")} 
        className="btn btn-link text-decoration-none text-muted p-0 mb-4 d-flex align-items-center gap-2 small border-0 bg-transparent"
      >
        <FaArrowLeft /> Back to Premium Listings
      </button>

      <div className="row g-4">
        {/* LEFT COLUMN */}
        <div className="col-lg-7">
          <img
            src={property.propertyImage || "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"}
            alt={property.propertyTitle}
            onError={(e) => { e.target.src = "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"; }}
            className="img-fluid shadow-sm"
            style={{ borderRadius: "20px", height: "480px", width: "100%", objectFit: "cover" }}
          />
          
          <div className="mt-4 p-4 card border-0 shadow-sm bg-white" style={{ borderRadius: "20px" }}>
            <h4 className="fw-bold mb-3">Description</h4>
            <p className="text-secondary" style={{ lineHeight: "1.7", whiteSpace: "pre-line" }}>
              {property.propertyDescription || "No overview summary provided for this listing yet."}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-lg-5">
          <div className="p-4 shadow-sm bg-white border" style={{ borderRadius: "20px" }}>
            <h2 className="fw-bold text-dark mb-2">{property.title}</h2>

            <h3 className="fw-bold mb-3" style={{ color: "#00B4A6" }}>
              ₹ {property.propertyPrice?.toLocaleString("en-IN")}
            </h3>

            <p className="text-muted d-flex align-items-center gap-2">
              <FaMapMarkerAlt className="text-danger" />
              {property.location
                ? `${property.location.address || ""}, ${property.location.city || ""}`
                : "Location details pending update"}
            </p>

            <hr className="my-4 text-muted" />

            <div className="row text-center mb-4 g-2">
              <div className="col-4 bg-light py-2 rounded-3">
                <FaBed className="text-secondary" /> 
                <span className="d-block small fw-bold mt-1">{property.propertyBedrooms} Beds</span>
              </div>
              <div className="col-4 bg-light py-2 rounded-3">
                <FaBath className="text-secondary" /> 
                <span className="d-block small fw-bold mt-1">{property.propertyBathrooms} Baths</span>
              </div>
              <div className="col-4 bg-light py-2 rounded-3">
                <FaRulerCombined className="text-secondary" /> 
                <span className="d-block small fw-bold mt-1">{property.propertyArea} sqft</span>
              </div>
            </div>

            <table className="table table-borderless text-secondary mb-4 small">
              <tbody>
                <tr>
                  <td><strong>Architecture style:</strong></td>
                  <td className="text-dark">{property.propertyStyle || "Modern"}</td>
                </tr>
                <tr>
                  <td><strong>Listing Variant:</strong></td>
                  <td className="text-dark">For {property.propertyType || "BUY"}</td>
                </tr>
                <tr>
                  <td><strong>Representative Agent:</strong></td>
                  <td className="text-dark">{property.listedBy || "Independent Property Owner"}</td>
                </tr>
              </tbody>
            </table>

            {property.favorite && (
              <div className="mb-4 d-flex align-items-center gap-2 small" style={{ background: "#ffe8e8", color: "red", padding: "12px", borderRadius: "10px", fontWeight: "500" }}>
                <FaHeart /> <span>Highly Requested Star Listing</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="mt-3 pt-3 border-top">
              <h5 className="fw-bold mb-3 text-dark fs-6">Inquire About This Property</h5>
              
              {submitStatus && (
                <div className={`alert ${submitStatus.success ? "alert-success" : "alert-danger"} small p-2`} role="alert">
                  {submitStatus.msg}
                </div>
              )}
              
              <div className="mb-2">
                <input type="text" name="name" className="form-control form-control-sm text-dark bg-white" placeholder="Your Name" value={contactForm.name} onChange={handleInputChange} required />
              </div>
              <div className="mb-2">
                <input type="email" name="email" className="form-control form-control-sm text-dark bg-white" placeholder="Your Email" value={contactForm.email} onChange={handleInputChange} required />
              </div>
              <div className="mb-3">
                <textarea name="message" rows="3" className="form-control form-control-sm text-dark bg-white" placeholder="Hi, I am interested in this listing..." value={contactForm.message} onChange={handleInputChange} required></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn w-100 text-white fw-bold d-flex align-items-center justify-content-center gap-2"
                style={{ background: "linear-gradient(90deg, #031B3A, #00B4A6)", borderRadius: "10px", padding: "10px", border: "none" }}
              >
                <FaEnvelope /> {isSubmitting ? "Sending Inquiry..." : "Contact Agent"}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;