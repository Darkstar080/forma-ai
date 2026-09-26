import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AIClaimPage.css";

const FORM_ID = "auto_insurance_claim_v1";

function AIClaimPage() {
  const [stage, setStage] = useState("processing");
  const [description, setDescription] = useState("");
  const [extractedData, setExtractedData] = useState(null);
  const [missingFields, setMissingFields] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedDescription = sessionStorage.getItem(
      "forma_claim_description"
    );

    if (!storedDescription?.trim()) {
      setError("No claim description was provided.");
      setStage("error");
      return;
    }

    setDescription(storedDescription);

    const extractClaim = async () => {
      try {
        setStage("processing");

        const response = await fetch(`/api/extract/${FORM_ID}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: storedDescription.trim(),
          }),
        });

        const responseText = await response.text();

let data = {};

try {
  data = responseText ? JSON.parse(responseText) : {};
} catch {
  console.error("Invalid JSON response:", responseText);
}

if (!response.ok) {
  console.error("Extraction API error:", {
    status: response.status,
    data,
    responseText,
  });

  throw new Error(
    data?.message ||
      data?.error ||
      `Extraction failed with status ${response.status}`
  );
}

        console.log("AI extraction result:", data);

        setExtractedData(data.extracted || {});
        setMissingFields(data.missing || []);
        setStage("review");
      } catch (err) {
        console.error("AI extraction error:", err);

        setError(
          err.message || "Something went wrong while processing your claim."
        );

        setStage("error");
      }
    };

    extractClaim();
  }, []);

  if (stage === "processing") {
    return (
      <div className="ai-claim-page">
        <div className="ai-claim-card">
          <p className="eyebrow">FORMA AI</p>

          <h1>Understanding your claim...</h1>

          <p>
            We're reading your description and identifying the
            information relevant to your claim.
          </p>

          <div className="ai-loader" />
        </div>
      </div>
    );
  }

  if (stage === "error") {
    return (
      <div className="ai-claim-page">
        <div className="ai-claim-card">
          <p className="eyebrow">FORMA AI</p>

          <h1>Something went wrong</h1>

          <p>{error}</p>

          <Link to="/" className="primary-action">
            Back to home <span>→</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-claim-page">
      <div className="ai-claim-card">
        <p className="eyebrow">AI EXTRACTION COMPLETE</p>

        <h1>We understood your claim.</h1>

        <p className="ai-description">
          "{description}"
        </p>

        <div className="extraction-result">
          <h3>Extracted information</h3>

          <pre>
            {JSON.stringify(extractedData, null, 2)}
          </pre>
        </div>

        {missingFields.length > 0 && (
          <div className="missing-fields">
            <h3>Information still needed</h3>

            <ul>
              {missingFields.map((field) => (
                <li key={field}>{field}</li>
              ))}
            </ul>
          </div>
        )}

        <p className="step-note">
          AI extraction is working. The next step will connect this
          data to the existing dynamic claim form.
        </p>
      </div>
    </div>
  );
}

export default AIClaimPage;