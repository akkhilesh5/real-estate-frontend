import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBuilding, FaPlusCircle, FaArrowLeft } from "react-icons/fa";
import API from "../services/api"; // ✨ Uses your flawless plural API instance

function AddProperty() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✨ Initial state types aligned directly with PropertyDto primitives
  const [form, setForm] = useState({
    propertyTitle: "",
    propertyPrice: "",
    propertyBedrooms: 3,
    propertyBathrooms: 3,
    propertyArea: 1500,
    propertyStyle: "Modern",
    propertyType: "BUY",
    description: "",
    propertyImage: "",
    location: {
      city: ""
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // ✨ FIXED: Construct an explicit payload following PropertyDto schema perfectly
    const payload = {
      propertyTitle: form.propertyTitle,
      propertyPrice: parseFloat(form.propertyPrice),
      propertyBedrooms: parseInt(form.propertyBedrooms, 10),
      propertyBathrooms: parseInt(form.propertyBathrooms, 10),
      propertyArea: parseFloat(form.propertyArea),
      propertyStyle: form.propertyStyle,
      propertyType: form.propertyType,
      description: form.description,
      propertyImage: form.propertyImage || null, // Convert empty string to null safely
      favorite: false,                           // Provide default primitive mapping
      listedBy: "Independent Owner",             // Prevent non-null validation errors
      location: {
        city: form.location.city
      }
      // Note: We deliberately exclude listedTime so Spring Boot can auto-generate the timestamp!
    };

    // ✨ Hits http://localhost:8080/api/properties/ with automatic JWT verification
    API.post("/properties/", payload)
      .then(() => {
        setLoading(false);
        navigate("/properties"); // Smoothly redirect back to the catalog view to see it live!
      })
      .catch((err) => {
        console.error("Error creating property listing:", err);
        setError("Failed to publish listing. Please check backend validation constraints or connection.");
        setLoading(false);
      });
  };

  return (
    <div className="container my-5 text-dark" style={{ maxWidth: "700px" }}>
      {/* Back Link */}
      <button 
        type="button"
        onClick={() => navigate(-1)} 
        className="btn btn-link text-decoration-none text-muted p-0 mb-4 d-flex align-items-center gap-2 small border-0 bg-transparent"
      >
        <FaArrowLeft /> Back to Listings
      </button>

      {/* Main Form Card Container */}
      <div className="card p-4 border-0 shadow-sm bg-white" style={{ borderRadius: "15px" }}>
        <div className="d-flex align-items-center gap-3 mb-4">
          <div className="p-3 rounded-3 text-white" style={{ backgroundColor: "#031B3A" }}>
            <FaBuilding size={24} />
          </div>
          <div>
            <h3 className="fw-bold text-dark mb-0">List a New Property</h3>
            <p className="text-muted small mb-0">Fill in the specifications to publish your real estate asset</p>
          </div>
        </div>

        {error && <div className="alert alert-danger small">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Property Title */}
            <div className="col-12">
              <label className="form-label small fw-bold text-secondary">Property Name / Title</label>
              <input
                type="text"
                required
                className="form-control py-2 text-dark bg-white"
                placeholder="e.g., Premium Orchid Villa, Sky High Apartment"
                value={form.propertyTitle}
                onChange={(e) => setForm({ ...form, propertyTitle: e.target.value })}
              />
            </div>

            {/* Price Tag */}
            <div className="col-12 col-md-6">
              <label className="form-label small fw-bold text-secondary">Valuation Price (₹)</label>
              <input
                type="number"
                required
                className="form-control py-2 text-dark bg-white"
                placeholder="e.g., 4500000"
                value={form.propertyPrice}
                onChange={(e) => setForm({ ...form, propertyPrice: e.target.value })}
              />
            </div>

            {/* City Location (Nested updates) */}
            <div className="col-12 col-md-6">
              <label className="form-label small fw-bold text-secondary">City Location</label>
              <input
                type="text"
                required
                className="form-control py-2 text-dark bg-white"
                placeholder="e.g., Indore, Mumbai"
                value={form.location.city}
                onChange={(e) => setForm({ 
                  ...form, 
                  location: { ...form.location, city: e.target.value } 
                })}
              />
            </div>

            {/* Bedrooms, Bathrooms, and Area metrics row */}
            <div className="col-4">
              <label className="form-label small fw-bold text-secondary">Beds</label>
              <input type="number" className="form-control text-dark bg-white" value={form.propertyBedrooms} onChange={(e) => setForm({ ...form, propertyBedrooms: parseInt(e.target.value, 10) || 0 })} />
            </div>
            <div className="col-4">
              <label className="form-label small fw-bold text-secondary">Baths</label>
              <input type="number" className="form-control text-dark bg-white" value={form.propertyBathrooms} onChange={(e) => setForm({ ...form, propertyBathrooms: parseInt(e.target.value, 10) || 0 })} />
            </div>
            <div className="col-4">
              <label className="form-label small fw-bold text-secondary">Sqft Area</label>
              <input type="number" className="form-control text-dark bg-white" value={form.propertyArea} onChange={(e) => setForm({ ...form, propertyArea: parseFloat(e.target.value) || 0 })} />
            </div>

            {/* Architecture Style Input */}
            <div className="col-12 col-md-6">
              <label className="form-label small fw-bold text-secondary">Architecture Style</label>
              <input
                type="text"
                className="form-control text-dark bg-white"
                placeholder="e.g., Modern, Luxury, Minimalist"
                value={form.propertyStyle}
                onChange={(e) => setForm({ ...form, propertyStyle: e.target.value })}
              />
            </div>

            {/* Purpose Classification Dropdown */}
            <div className="col-12 col-md-6">
              <label className="form-label small fw-bold text-secondary">Listing Purpose</label>
              <select
                className="form-select py-2 text-dark bg-white"
                value={form.propertyType}
                onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
              >
                <option value="BUY">For Sale (BUY)</option>
                <option value="RENT">For Rent (RENT)</option>
              </select>
            </div>

            {/* Optional Image Name Field */}
            <div className="col-12">
              <label className="form-label small fw-bold text-secondary">Property Image File Name (Optional)</label>
              <input
                type="text"
                className="form-control text-dark bg-white"
                placeholder="e.g., house1.jpg (Leave empty for default showcase image)"
                value={form.propertyImage}
                onChange={(e) => setForm({ ...form, propertyImage: e.target.value })}
              />
            </div>

            {/* Description Text Box */}
            <div className="col-12">
              <label className="form-label small fw-bold text-secondary">Property Description</label>
              <textarea
                rows="4"
                required
                className="form-control text-dark bg-white"
                placeholder="Detail the layout structural highlights, rooms, spacing availability..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              ></textarea>
            </div>

            {/* Submit Action Button */}
            <div className="col-12 mt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="btn text-white w-100 py-2 fw-medium d-flex align-items-center justify-content-center gap-2" 
                style={{ backgroundColor: "#00B4A6", borderRadius: "8px", border: "none" }}
              >
                <FaPlusCircle size={16} /> 
                {loading ? "Publishing Listing..." : "Publish Real Estate Listing"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProperty;