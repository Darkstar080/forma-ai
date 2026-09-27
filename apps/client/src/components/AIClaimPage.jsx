import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MagicClaimForm from "./MagicClaimForm";
import "./AIClaimPage.css";

const FORM_ID = "auto_insurance_claim_v1";

function AIClaimPage() {
  const [stage, setStage] = useState("processing");
  const [description, setDescription] = useState("");
  const [extractedData, setExtractedData] = useState({});
  const [claimData, setClaimData] = useState({});
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

    const response = await fetch("/api/extract/magic", {
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

    setExtractedData(data.extracted || {});
    setStage("form");
  } catch (err) {
    console.error("AI extraction error:", err);

    setError(
      err.message ||
        "Something went wrong while processing your claim."
    );

    setStage("error");
  }
};

    extractClaim();
  }, []);

  /* =========================
     PROCESSING
  ========================= */

  if (stage === "processing") {
    return (
      <div className="ai-claim-page">
        <div className="ai-processing">
          <div className="ai-brand-mark">F</div>

          <p className="ai-eyebrow">FORMA AI</p>

          <h1>Understanding your claim</h1>

          <p>
            We're reading your description and preparing the claim
            details for you.
          </p>

          <div className="ai-loader" />
        </div>
      </div>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (stage === "error") {
    return (
      <div className="ai-claim-page">
        <div className="ai-error-card">
          <p className="ai-eyebrow">FORMA AI</p>

          <h1>We couldn't process your claim.</h1>

          <p>{error}</p>

          <Link to="/" className="ai-back-button">
            Back to home <span>→</span>
          </Link>
        </div>
      </div>
    );
  }

  /* =========================
     PREVIEW PLACEHOLDER
  ========================= */

  if (stage === "preview") {
    return (
      <div className="ai-claim-page">
        <div className="ai-processing">
          <p className="ai-eyebrow">FORMA AI</p>

          <h1>Claim information captured</h1>

          <p>
            Your completed claim information is ready for the
            review screen.
          </p>

          <button
            type="button"
            className="ai-back-button"
            onClick={() => setStage("form")}
          >
            ← Edit claim
          </button>
        </div>
      </div>
    );
  }

  /* =========================
     CLAIM FORM
  ========================= */

  return (
    <div className="ai-claim-page">
      <header className="ai-topbar">
        <Link to="/" className="ai-logo">
          <span className="ai-logo-mark">F</span>
          <span>Forma</span>
        </Link>

        <div className="ai-progress">
          <span className="progress-step completed">
            <span>1</span>
            Describe
          </span>

          <div className="progress-line active" />

          <span className="progress-step current">
            <span>2</span>
            Complete
          </span>

          <div className="progress-line" />

          <span className="progress-step">
            <span>3</span>
            Review
          </span>
        </div>

        <Link to="/" className="ai-exit">
          Exit
        </Link>
      </header>

      <main className="ai-claim-main">
        <section className="ai-intro-section">
          <p className="ai-eyebrow">AI-ASSISTED CLAIM</p>

          <h1>Let's complete your claim.</h1>

          <p className="ai-intro-text">
            We've understood what happened and filled in the
            information we could identify. Complete anything that's
            still missing before reviewing your claim.
          </p>
        </section>

        <section className="ai-workspace">
          {/* =========================
              USER STORY
          ========================= */}

          <aside className="ai-story-panel">
            <div className="ai-status">
              <span className="ai-status-icon">✓</span>

              <div>
                <strong>Claim details identified</strong>
                <span>AI-assisted</span>
              </div>
            </div>

            <div className="ai-story-divider" />

            <p className="ai-story-label">
              YOUR DESCRIPTION
            </p>

            <blockquote>
              “{description}”
            </blockquote>

            <div className="ai-trust-note">
              <span>✦</span>

              <p>
                Information identified from your description has
                been prefilled for you. You can review and change
                every field before continuing.
              </p>
            </div>
          </aside>

          {/* =========================
              MAGIC CLAIM FORM
          ========================= */}

          <section className="ai-form-panel">
            <div className="ai-form-heading">
              <div>
                <p className="ai-form-kicker">
                  AUTO INSURANCE CLAIM
                </p>

                <h2>Complete your claim</h2>
              </div>

              <span className="ai-form-badge">
                AI PREFILLED
              </span>
            </div>

            <p className="ai-form-description">
              Review the information we've identified and provide
              any details that are still missing.
            </p>

            <div className="ai-form-container">
              <MagicClaimForm
                extractedData={
                  Object.keys(claimData).length
                    ? claimData
                    : extractedData
                }
                description={description}
                onSubmit={(data) => {
                  setClaimData(data);

                  sessionStorage.setItem(
                    "forma_magic_claim",
                    JSON.stringify(data)
                  );

                  setStage("preview");
                }}
              />
            </div>
          </section>
        </section>

        <p className="ai-footer-note">
          Your information is used only to prepare your claim
          document. You remain in control of every detail.
        </p>
      </main>
    </div>
  );
}

export default AIClaimPage;