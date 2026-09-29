import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authFetch, isLoggedIn } from "../lib/api";

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

  if (!isLoggedIn()) {
    return <p style={{ padding: "2rem" }}>Please <Link to="/login">log in</Link> to see your claims.</p>;
  }
  if (loading) return <p style={{ padding: "2rem" }}>Loading your claims...</p>;
  if (!claims.length) return <p style={{ padding: "2rem" }}>You have no saved claims yet.</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
      <h2>My Claims</h2>
      {claims.map((c) => (
        <div key={c._id} style={{ padding: "12px 0", borderBottom: "1px solid #e2e8f0" }}>
          <strong>{c.formId}</strong> — {c.status}
          <br />
          <small>Last updated: {new Date(c.updatedAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default MyClaims;