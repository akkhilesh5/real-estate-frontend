import { useEffect, useState } from "react";
import { getAllTransactions } from "../services/api";
import { FaExchangeAlt, FaBuilding, FaUser, FaCalendarAlt, FaMoneyBillWave, FaSearch } from "react-icons/fa";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let isMounted = true;
    
    getAllTransactions()
      .then((response) => {
        if (isMounted) {
          // Fallback to an empty array if response data is missing
          const data = response.data || [];
          setTransactions(data);
          setFilteredTransactions(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("API Fetch Error:", err);
          setError("Could not retrieve transaction logs from the server.");
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, []);

  // Live Search Filter Engine
  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = transactions.filter((t) => {
      if (!t) return false;
      
      // Extract properties safely for searching strings
      const propName = t.property?.propertyName || t.property?.title || t.property?.name || "";
      const uName = t.user?.userName || t.user?.name || "";
      const txType = t.transactionType || "";
      const txId = t.transactionId?.toString() || "";
      const txAmount = t.transactionAmount?.toString() || "";

      return (
        txId.toLowerCase().includes(lowerSearch) ||
        txType.toLowerCase().includes(lowerSearch) ||
        propName.toLowerCase().includes(lowerSearch) ||
        uName.toLowerCase().includes(lowerSearch) ||
        txAmount.includes(lowerSearch)
      );
    });
    setFilteredTransactions(filtered);
  }, [searchTerm, transactions]);

  if (loading) {
    return (
      <div className="container mt-5 text-center py-5">
        <div className="spinner-border" role="status" style={{ color: "#00B4A6" }}></div>
        <h4 className="mt-3 text-muted">Accessing financial ledger database...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center py-5">
        <div className="alert alert-danger" role="alert">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      {/* Header Panel */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold text-dark mb-1">Financial Ledgers</h2>
          <p className="text-muted small mb-0">Review and inspect real estate asset assignments</p>
        </div>
        
        {/* Search Input Bar */}
        <div className="input-group" style={{ maxWidth: "350px" }}>
          <span className="input-group-text bg-white border-end-0 text-muted">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control border-start-0 ps-0"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="card text-center p-5 border-0 shadow-sm" style={{ borderRadius: "15px" }}>
          <FaExchangeAlt size={40} className="text-muted mx-auto mb-3" />
          <p className="text-muted fs-5 mb-0">No transaction records found.</p>
        </div>
      ) : (
        /* Ledger Table Element */
        <div className="card border-0 shadow-sm" style={{ borderRadius: "15px", overflow: "hidden" }}>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead style={{ backgroundColor: "#031B3A", color: "#fff" }}>
                <tr>
                  <th className="py-3 ps-4">Transaction ID</th>
                  <th className="py-3">Property Asset</th>
                  <th className="py-3">Client Profile</th>
                  <th className="py-3">Execution Date</th>
                  <th className="py-3">Classification</th>
                  <th className="py-3 pe-4 text-end">Settlement Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => {
                  if (!tx) return null;

                  return (
                    <tr key={tx.transactionId || Math.random()}>
                      {/* ID Column */}
                      <td className="ps-4 fw-bold text-secondary">#{tx.transactionId || "N/A"}</td>
                      
                      {/* Property Nested Column Info */}
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <FaBuilding style={{ color: "#00B4A6" }} />
                          <div>
                            <span className="fw-semibold text-dark d-block">
                              {/* 🛡️ Tries multiple key variations automatically */}
                              {tx.property?.propertyName || tx.property?.title || tx.property?.name || `Property #${tx.property?.propertyId || "ID"}`}
                            </span>
                            <span className="text-muted d-block small text-capitalize">
                              {tx.property?.propertyCity || tx.property?.city || "Real Estate Asset"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* User Nested Column Info */}
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <FaUser className="text-primary" />
                          <span className="text-secondary fw-medium">
                            {/* 🛡️ Tries both userName and name variations safely */}
                            {tx.user?.userName || tx.user?.name || "Registered Client"}
                          </span>
                        </div>
                      </td>

                      {/* Date Column */}
                      <td>
                        <div className="d-flex align-items-center gap-2 text-muted small">
                          <FaCalendarAlt />
                          {tx.transactionDate ? new Date(tx.transactionDate).toLocaleDateString() : "Recent"}
                        </div>
                      </td>

                      {/* Badge Layout Classification */}
                      <td>
                        <span 
                          className="badge px-3 py-2 rounded-pill fw-bold small"
                          style={
                            tx.transactionType?.toUpperCase() === "BUY"
                              ? { backgroundColor: "rgba(23, 201, 100, 0.15)", color: "#17C964" }
                              : { backgroundColor: "rgba(0, 180, 166, 0.15)", color: "#00B4A6" }
                          }
                        >
                          {tx.transactionType?.toUpperCase() || "STANDARD"}
                        </span>
                      </td>

                      {/* Settlement Valuation Amount */}
                      <td className="pe-4 text-end fw-bold text-dark">
                        <FaMoneyBillWave className="text-success me-1" size={14} />
                        ₹{(tx.transactionAmount || 0).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transactions;