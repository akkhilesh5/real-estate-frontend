import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllTransactions } from "../services/api";
import { FaWallet, FaBuilding, FaUserCircle, FaHistory, FaArrowRight } from "react-icons/fa";

function Dashboard() {
  const [metrics, setMetrics] = useState({ totalSpent: 0, txCount: 0 });
  const [loading, setLoading] = useState(true);
  
  // Extracting dummy user info since auth is local (Substitute with your state/token data)
  const userName = localStorage.getItem("username") || "Valued Client";

  useEffect(() => {
    getAllTransactions()
      .then((response) => {
        const data = response.data || [];
        // Calculate total financial investment volume dynamically
        const total = data.reduce((sum, tx) => sum + (tx.transactionAmount || 0), 0);
        setMetrics({
          totalSpent: total,
          txCount: data.length
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard metrics sync error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center py-5">
        <div className="spinner-border text-teal" role="status" style={{ color: "#00B4A6" }}></div>
        <h4 className="mt-3 text-muted">Assembling dashboard analytics...</h4>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      {/* Welcome Banner */}
      <div className="p-4 mb-4 text-white rounded-3 shadow-sm d-flex align-items-center justify-content-between"
           style={{ background: "linear-gradient(135deg, #031B3A, #0A3A75)" }}>
        <div>
          <h2 className="fw-bold mb-1">Welcome Back, {userName}!</h2>
          <p className="mb-0 text-white-50 small">Manage your properties, investments, and account ledger settlements from one place.</p>
        </div>
        <FaUserCircle size={55} className="text-white-50 d-none d-md-block" />
      </div>

      {/* Analytics Grid Section */}
      <div className="row g-4 mb-5">
        {/* Card 1: Total Capital Investment */}
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: "12px" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted small text-uppercase fw-bold d-block mb-1">Total Investment</span>
                <h3 className="fw-bold text-dark mb-0">₹{metrics.totalSpent.toLocaleString()}</h3>
              </div>
              <div className="p-3 rounded-3" style={{ backgroundColor: "rgba(23, 201, 100, 0.1)", color: "#17C964" }}>
                <FaWallet size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Closed Settlements Counter */}
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: "12px" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted small text-uppercase fw-bold d-block mb-1">Total Transactions</span>
                <h3 className="fw-bold text-dark mb-0">{metrics.txCount} Records</h3>
              </div>
              <div className="p-3 rounded-3" style={{ backgroundColor: "rgba(0, 180, 166, 0.1)", color: "#00B4A6" }}>
                <FaHistory size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Saved Listings (Mock Data Point) */}
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: "12px" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted small text-uppercase fw-bold d-block mb-1">Saved Properties</span>
                <h3 className="fw-bold text-dark mb-0">4 Saved</h3>
              </div>
              <div className="p-3 rounded-3" style={{ backgroundColor: "rgba(7, 43, 85, 0.1)", color: "#072B55" }}>
                <FaBuilding size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Panels */}
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <div className="p-4 bg-white border shadow-sm h-100" style={{ borderRadius: "12px" }}>
            <h5 className="fw-bold text-dark mb-3">Financial Activities</h5>
            <p className="text-muted small">Review complete verified transactional invoices, purchase contracts, and dynamic ledgers.</p>
            <Link to="/transactions" className="btn btn-sm text-white fw-medium d-inline-flex align-items-center gap-2 mt-2" style={{ backgroundColor: "#00B4A6", borderRadius: "6px" }}>
              View History Ledger <FaArrowRight size={12} />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="p-4 bg-white border shadow-sm h-100" style={{ borderRadius: "12px" }}>
            <h5 className="fw-bold text-dark mb-3">Explore Real Estate Listings</h5>
            <p className="text-muted small">Browse top agents and premium structural listings matching your account profile preferences.</p>
            <Link to="/properties" className="btn btn-sm text-white fw-medium d-inline-flex align-items-center gap-2 mt-2" style={{ backgroundColor: "#072B55", borderRadius: "6px" }}>
              Explore Properties <FaArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;