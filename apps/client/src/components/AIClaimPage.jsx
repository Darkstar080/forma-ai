import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MagicClaimForm from "./MagicClaimForm";
import ClaimPreview from "./ClaimPreview";
import { generateClaimPDF } from "./generateClaimPDF";
import "./AIClaimPage.css";

function AIClaimPage() {
  const [stage, setStage] = useState("processing");
  const [description, setDescription] = useState("");
  const [claimData, setClaimData] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const storedDescription = sessionStorage.getItem(
      "forma_claim_description"
    );

    const storedClaim = sessionStorage.getItem(
      "forma_magic_claim"
    );

    if (!storedClaim) {
      setError(
        "No saved claim found. Run the Magic Box extraction once first."
      );
      setStage("error");
      return;
    }

    try {
      const parsedClaim = JSON.parse(storedClaim);

      setDescription(storedDescription || "");
      setClaimData(parsedClaim);
      setStage("preview");
    } catch (err) {
      console.error("Saved claim error:", err);

      setError("Saved claim data is invalid.");
      setStage("error");
    }
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

          <h1>Loading your claim</h1>

          <p>
            We're preparing your saved claim information.
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

          <h1>We couldn't load your claim.</h1>

          <p>{error}</p>

          <Link to="/" className="ai-back-button">
            Back to home <span>→</span>
          </Link>
        </div>
      </div>
    );
  }

  /* =========================
     PREVIEW
  ========================= */

  if (stage === "preview") {
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

            <span className="progress-step completed">
              <span>2</span>
              Complete
            </span>

            <div className="progress-line active" />

            <span className="progress-step current">
              <span>3</span>
              Review
            </span>
          </div>

          <Link to="/" className="ai-exit">
            Exit
          </Link>
        </header>

        <ClaimPreview
          claimData={claimData}
          description={description}
          onEdit={() => setStage("form")}
          onGenerate={() => {
            generateClaimPDF(claimData, description);
          }}
        />
      </div>
    );
  }

  /* =========================
     EDIT CLAIM FORM
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

          <h1>Edit your claim.</h1>

          <p className="ai-intro-text">
            Review or update any claim information before generating
            your claim document.
          </p>
        </section>

        <section className="ai-workspace">
          <aside className="ai-story-panel">
            <div className="ai-status">
              <span className="ai-status-icon">✓</span>

              <div>
                <strong>Claim details identified</strong>
                <span>Saved claim</span>
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
                You can review and change every detail before
                generating the claim document.
              </p>
            </div>
          </aside>

          <section className="ai-form-panel">
            <div className="ai-form-heading">
              <div>
                <p className="ai-form-kicker">
                  AUTO INSURANCE CLAIM
                </p>

                <h2>Edit claim information</h2>
              </div>

              <span className="ai-form-badge">
                SAVED CLAIM
              </span>
            </div>

            <p className="ai-form-description">
              Update any information that needs to be corrected or
              completed.
            </p>

            <div className="ai-form-container">
              <MagicClaimForm
                extractedData={claimData}
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
          Your information remains under your control throughout
          the claim preparation process.
        </p>
      </main>
    </div>
  );
}

export default AIClaimPage;