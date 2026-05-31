import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAllProperties } from "../services/api";
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined } from "react-icons/fa";

function Properties() {
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchCity, setSearchCity] = useState(location.state?.city || "");
  const [propertyType, setPropertyType] = useState(location.state?.type || "");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    getAllProperties()
      .then((response) => {
        // Handle array directly or handle paginated content blocks safely
        const dataArray = Array.isArray(response.data) ? response.data : response.data?.content || [];
        setProperties(dataArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading properties from backend repository:", err);
        setError("Could not communicate with Spring Boot repository.");
        setLoading(false);
      });
  }, []);

  const filteredProperties = properties.filter((item) => {
    // ✨ FIXED: Extract city cleanly out of your nested location DTO structure
    const cityValue = item.location?.city || "";
    const matchesCity = cityValue.toLowerCase().includes(searchCity.toLowerCase());
    
    const matchesType = propertyType ? item.propertyType === propertyType : true;
    const matchesPrice = maxPrice ? item.propertyPrice <= parseFloat(maxPrice) : true;

    return matchesCity && matchesType && matchesPrice;
  });

  if (loading) {
    return (
      <div className="container mt-5 text-center py-5">
        <div className="spinner-border text-teal" role="status" style={{ color: "#00B4A6" }}></div>
        <h4 className="mt-3 text-muted">Scanning active listings...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5 text-dark">
      <h2 className="fw-bold mb-4">Explore Available Properties</h2>

      {/* FILTER PANEL CONSOLE */}
      <div className="card border-0 shadow-sm p-4 mb-5 bg-white" style={{ borderRadius: "15px" }}>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label fw-semibold text-secondary">Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Filter by city..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold text-secondary">Listing Purpose</label>
            <select
              className="form-select"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="">All Purpose types</option>
              <option value="BUY">For Sale (BUY)</option>
              <option value="RENT">For Rent (RENT)</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold text-secondary">Maximum Budget (₹)</label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g. 7500000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* PROPERTY MARKETPLACE GRID */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted fs-5">No listings found matching criteria inputs.</p>
          <button 
            className="btn btn-sm text-white" 
            style={{ backgroundColor: "#00B4A6" }}
            onClick={() => { setSearchCity(""); setPropertyType(""); setMaxPrice(""); }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {filteredProperties.map((property) => (
            <div key={property.propertyId} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm bg-white" style={{ borderRadius: "15px", overflow: "hidden" }}>
                
                {/* Visual Header Feature */}
                <div className="position-relative" style={{ height: "220px" }}>
                  <img
                    src={property.propertyImage ? `/images/${property.propertyImage}` : "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=500&q=80"}
                    alt={property.propertyTitle} // ✨ FIXED: Changed to propertyTitle
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=500&q=80"; }}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="badge bg-dark position-absolute top-0 start-0 m-3 px-3 py-2">
                    For {property.propertyType}
                  </span>
                </div>

                {/* Body Core Information Profile */}
                <div className="card-body d-flex flex-column p-4">
                  <h4 className="fw-bold mb-1" style={{ color: "#031B3A" }}>
                    ₹ {property.propertyPrice?.toLocaleString("en-IN")}
                  </h4>
                  
                  {/* ✨ FIXED: Changed to propertyTitle */}
                  <h5 className="card-title text-truncate fw-semibold mb-2">{property.propertyTitle}</h5>
                  
                  <p className="text-muted small text-truncate mb-3">
                    <FaMapMarkerAlt className="text-danger me-1" />
                    {/* ✨ FIXED: Safely extracting nested address values from your LocationDto mapping */}
                    {property.location ? `${property.location.address || ""}, ${property.location.city || ""}` : "Address Unlisted"}
                  </p>

                  {/* ✨ FIXED: Changed to property.description */}
                  <p className="text-muted small text-truncate line-clamp-2 mb-3" style={{ fontSize: "13px" }}>
                    {property.description || "No overview descriptive summary logged."}
                  </p>

                  <hr className="text-muted mt-auto" />

                  {/* Quantitative Metric Structural Measures */}
                  <div className="d-flex justify-content-between text-secondary small mb-3">
                    <span><FaBed /> {property.propertyBedrooms} Beds</span>
                    <span><FaBath /> {property.propertyBathrooms} Baths</span>
                    <span><FaRulerCombined /> {property.propertyArea} sqft</span>
                  </div>

                  {/* Dynamic Parameter Navigation Routing Anchor */}
                  <Link 
                    to={`/properties/${property.propertyId}`} 
                    className="btn w-100 text-white text-center fw-semibold"
                    style={{ background: "linear-gradient(90deg, #031B3A, #00B4A6)", borderRadius: "8px", border: "none" }}
                  >
                    View Details
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Properties;