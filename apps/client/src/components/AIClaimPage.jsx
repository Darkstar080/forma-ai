import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DynamicFormRenderer from "./DynamicFormRenderer/DynamicFormRenderer";
import "./AIClaimPage.css";

const FORM_ID = "auto_insurance_claim_v1";

function AIClaimPage() {
  const [stage, setStage] = useState("processing");
  const [description, setDescription] = useState("");
  const [extractedData, setExtractedData] = useState({});
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

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              data?.error ||
              "Unable to process your claim."
          );
        }

        console.log("AI extraction result:", data);

        setExtractedData(data.extracted || {});
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
        <div className="ai-claim-card processing-card">
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
        <div className="ai-claim-card error-card">
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
      <div className="ai-claim-content">
        <div className="ai-page-header">
          <p className="eyebrow">FORMA AI</p>

          <h1>Let's complete your claim.</h1>

          <p className="ai-intro">
            We've filled in the details we could identify from your
            description. Review them and complete anything that's missing.
          </p>

          <div className="claim-story">
            <span className="claim-story-label">YOUR DESCRIPTION</span>

            <p>"{description}"</p>
          </div>
        </div>

        <div className="ai-form-container">
          <DynamicFormRenderer
            formId={FORM_ID}
            description="Review the information we've identified and complete any missing details."
            initialValues={extractedData}
          />
        </div>
      </div>
    </div>
  );
}

export default AIClaimPage;