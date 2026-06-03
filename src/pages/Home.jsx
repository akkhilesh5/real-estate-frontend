import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllProperties } from "../services/api";
import { FaSearch, FaBuilding, FaHandshake, FaShieldAlt, FaMapMarkerAlt, FaBed, FaBath } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [propertyType, setPropertyType] = useState("");

  useEffect(() => {
    getAllProperties()
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          setFeaturedProperties(res.data.slice(0, 3));
        }
      })
      .catch((err) => console.error("Error fetching featured properties:", err));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate("/properties", { state: { city: searchCity, type: propertyType } });
  };

  return (
    <div className="overflow-hidden">
      
      {/* HERO SECTION */}
      <div 
        className="position-relative d-flex align-items-center justify-content-center text-center text-white"
        style={{
          background: "linear-gradient(rgba(3, 27, 58, 0.7), rgba(7, 43, 85, 0.85)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80') no-repeat center center/cover",
          minHeight: "75vh",
          padding: "20px"
        }}
      >
        <div className="container" style={{ zIndex: 2, maxWidth: "850px" }}>
          <h1 className="display-4 fw-bold mb-3">
            Find Your Dream Home with <span style={{ color: "#00B4A6" }}>EstateHub</span>
          </h1>
          <p className="lead mb-5 text-light-50">
            Discover a premium collection of luxury villas, modern apartments, and cozy family spaces.
          </p>

          {/* QUICK FILTER BAR */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="row g-2 p-3 bg-white shadow-lg text-dark mx-auto"
            style={{ borderRadius: "15px" }}
          >
            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-transparent border-0 text-muted"><FaMapMarkerAlt /></span>
                <input 
                  type="text" 
                  className="form-control border-0 bg-transparent" 
                  placeholder="Enter City (e.g. New York, London)"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4 border-start">
              <select 
                className="form-select border-0 bg-transparent text-secondary"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="">Property Type</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Condo">Condo</option>
                <option value="Villa">Villa</option>
              </select>
            </div>
            <div className="col-md-3">
              <button 
                type="submit" 
                className="btn w-100 text-white d-flex align-items-center justify-content-center gap-2 py-2"
                style={{ background: "linear-gradient(90deg, #031B3A, #00B4A6)", borderRadius: "8px" }}
              >
                <FaSearch /> Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* VALUE CORE STATS */}
      <div className="container py-5 my-3">
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="d-inline-flex p-3 bg-light rounded-circle mb-3" style={{ color: "#00B4A6", fontSize: "24px" }}><FaBuilding /></div>
            <h5 className="fw-bold">Premium Portfolio</h5>
            <p className="text-muted small">Handpicked premium properties matching top architectural specifications.</p>
          </div>
          <div className="col-md-4">
            <div className="d-inline-flex p-3 bg-light rounded-circle mb-3" style={{ color: "#00B4A6", fontSize: "24px" }}><FaHandshake /></div>
            <h5 className="fw-bold">Verified Agents</h5>
            <p className="text-muted small">Direct connections to registered brokers without middleman complications.</p>
          </div>
          <div className="col-md-4">
            <div className="d-inline-flex p-3 bg-light rounded-circle mb-3" style={{ color: "#00B4A6", fontSize: "24px" }}><FaShieldAlt /></div>
            <h5 className="fw-bold">Secure Escrows</h5>
            <p className="text-muted small">Your communication trails and dynamic transactions are fully protected.</p>
          </div>
        </div>
      </div>

      {/* FEATURED REAL ESTATE GRID */}
      <div className="bg-light py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <span className="text-uppercase fw-bold small" style={{ color: "#00B4A6" }}>Live Listings</span>
              <h2 className="fw-bold text-dark m-0">Featured Properties</h2>
            </div>
            <Link to="/properties" className="btn btn-outline-dark px-4 fw-medium btn-sm" style={{ borderRadius: "8px" }}>
              See All
            </Link>
          </div>

          {featuredProperties.length === 0 ? (
            <p className="text-center text-muted py-4">No active featured listings found.</p>
          ) : (
            <div className="row g-4">
              {featuredProperties.map((property) => (
                <div key={property.propertyId} className="col-md-4">
                  <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: "15px", overflow: "hidden" }}>
                    <img 
                       src={property.propertyImage || "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"}
                       alt={property.propertyTitle} 
                      onError={(e) => { e.target.src = "/images/default-house.jpg"; }}
                      className="w-100" 
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body p-4">
                      <h4 className="fw-bold" style={{ color: "#031B3A" }}>₹ {property.propertyPrice?.toLocaleString("en-IN")}</h4>
                      <h6 className="card-title text-truncate fw-bold mb-1">{property.propertyTitle}</h6>
                      <p className="text-muted small mb-3"><FaMapMarkerAlt className="text-danger me-1"/>{property.propertyStyle || "Location Pending"}</p>
                      <hr />
                      <div className="d-flex justify-content-between text-secondary small mb-3">
                        <span><FaBed /> {property.propertyBedrooms} Beds</span>
                        <span><FaBath /> {property.propertyBathrooms} Baths</span>
                      </div>
                      <Link 
                        to={`/properties/${property.propertyId}`} 
                        className="btn w-100 text-white fw-medium btn-sm"
                        style={{ background: "linear-gradient(90deg, #031B3A, #00B4A6)", borderRadius: "6px" }}
                      >
                        Explore Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default Home;