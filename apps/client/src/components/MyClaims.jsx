import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authFetch, isLoggedIn, downloadSubmissionPdf } from "../lib/api";
import "./MyClaims.css";

function MyClaims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      setLoading(false);
      return;
    }
    authFetch("/api/submissions")
      .then((res) => res.json())
      .then(setClaims)
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = (e, claim) => {
    e.preventDefault();
    e.stopPropagation();
    downloadSubmissionPdf(claim._id, `${claim.formId}-claim.pdf`);
  };

  if (!isLoggedIn()) {
    return (
      <div className="my-claims-page">
        <div className="my-claims-inner">
          <p className="my-claims-login">Please <Link to="/login">log in</Link> to see your claims.</p>
        </div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="my-claims-page">
        <div className="my-claims-inner"><p className="my-claims-empty">Loading your claims...</p></div>
      </div>
    );
  }
  if (!claims.length) {
    return (
      <div className="my-claims-page">
        <div className="my-claims-inner">
          <h2>My Claims</h2>
          <p className="my-claims-empty">You have no saved claims yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-claims-page">
      <div className="my-claims-inner">
        <h2>My Claims</h2>
        {claims.map((c) => (
          <div key={c._id} className="claim-row">
            <Link to={`/claim?formId=${c.formId}&resume=${c._id}`} className="claim-row-link">
              <strong>{c.formId}</strong>
              <span className={`claim-status-badge ${c.status}`}>{c.status}</span>
              <small>Last updated: {new Date(c.updatedAt).toLocaleString()}</small>
            </Link>
            {c.status === "submitted" && (
              <button type="button" className="claim-download-btn" onClick={(e) => handleDownload(e, c)}>
                Download PDF
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyClaims;