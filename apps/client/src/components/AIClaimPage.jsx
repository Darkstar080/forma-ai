import { useState } from "react";
import "./AIClaimPage.css";

const FORM_ID = "auto_insurance_claim_v1";

function AIClaimPage() {
  const [description, setDescription] = useState("");
  const [stage, setStage] = useState("input");

  const handleStartClaim = async () => {
    if (!description.trim()) {
      return;
    }

    setStage("processing");

    try {
      const response = await fetch(`/api/extract/${FORM_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: description.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Unable to process your claim."
        );
      }

      console.log("AI extraction result:", data);

      setStage("review");
    } catch (error) {
      console.error(error);
      setStage("input");
      alert(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="ai-claim-page">
      <div className="ai-claim-container">

        {/* Header */}
        <div className="ai-claim-header">
          <div className="ai-claim-eyebrow">
            Forma AI
          </div>

          <h1>
            Tell us what happened.
          </h1>

          <p>
            Describe your incident naturally. Forma AI will
            understand the details and help prepare your claim.
          </p>
        </div>

        {/* Main Card */}
        <div className="ai-claim-card">

          {stage === "input" && (
            <>
              <div className="ai-claim-card-header">
                <h2>
                  Start your claim
                </h2>

                <p>
                  You don't need to know exactly what information
                  we need. Just tell us what happened.
                </p>
              </div>

              <label
                className="ai-story-label"
                htmlFor="claim-description"
              >
                What happened?
              </label>

              <textarea
                id="claim-description"
                className="ai-story-input"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="For example: I hit a deer on I-95 yesterday in my Honda, and the windshield shattered."
              />

              <div className="ai-story-footer">
                <span className="ai-story-hint">
                  AI assisted • You review everything before submitting
                </span>

                <span className="ai-story-counter">
                  {description.length}/2000
                </span>
              </div>

              <div className="ai-claim-actions">
                <button
                  type="button"
                  className="ai-claim-button ai-claim-button-primary"
                  onClick={handleStartClaim}
                  disabled={!description.trim()}
                >
                  Continue with AI →
                </button>
              </div>
            </>
          )}

          {stage === "processing" && (
            <div className="ai-processing">
              <div className="ai-processing-spinner" />

              <h2>
                Understanding your claim
              </h2>

              <p>
                Forma AI is identifying the details from your
                description.
              </p>

              <div className="ai-processing-steps">
                <span className="ai-processing-step ai-processing-step-active">
                  Reading your story
                </span>

                <span className="ai-processing-step">
                  Extracting details
                </span>

                <span className="ai-processing-step">
                  Preparing claim
                </span>
              </div>
            </div>
          )}

          {stage === "review" && (
            <>
              <div className="ai-review-header">
                <div className="ai-review-title">
                  <h2>
                    We understood your story
                  </h2>

                  <p>
                    Review the information before continuing.
                  </p>
                </div>

                <span className="ai-review-badge">
                  AI assisted
                </span>
              </div>

              <div className="ai-original-story">
                <div className="ai-original-story-label">
                  Your description
                </div>

                <p>
                  {description}
                </p>
              </div>

              <div className="ai-extraction-section">
                <h3>
                  Next step
                </h3>

                <p className="ai-review-note">
                  Your claim details have been processed.
                  The next step will connect this result to
                  your existing claim form so you can review
                  and complete any missing information.
                </p>
              </div>

              <div className="ai-review-actions">
                <button
                  type="button"
                  className="ai-claim-button ai-claim-button-secondary"
                  onClick={() => setStage("input")}
                >
                  ← Edit description
                </button>

                <button
                  type="button"
                  className="ai-claim-button ai-claim-button-primary"
                  disabled
                >
                  Continue to claim →
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default AIClaimPage;