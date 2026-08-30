import { useState } from "react";
import "./Footer.css";

function Footer() {
  const [activeModal, setActiveModal] = useState(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <footer className="forma-footer-new">
        <div className="footer-main">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo-new">
              Forma<span>AI</span>
            </div>

            <p>
              Insurance workflows,
              <br />
              made simpler.
            </p>
          </div>

          {/* Product */}
          <div className="footer-column">
            <h4>Product</h4>

            <button
              type="button"
              className="footer-action"
              onClick={() => setActiveModal("features")}
            >
              Features
            </button>

            <button
              type="button"
              className="footer-action"
              onClick={() => setActiveModal("claims")}
            >
              Claims
            </button>

            <button
              type="button"
              className="footer-action"
              onClick={() => setActiveModal("how-it-works")}
            >
              How it works
            </button>
          </div>

          {/* Company */}
          <div className="footer-column">
            <h4>Company</h4>

            <button
              type="button"
              className="footer-action"
              onClick={() => setActiveModal("about")}
            >
              About Forma AI
            </button>

            <button
              type="button"
              className="footer-action"
              onClick={() => setActiveModal("support")}
            >
              Support
            </button>

            <button
              type="button"
              className="footer-action"
              onClick={() => setActiveModal("contact")}
            >
              Contact
            </button>
          </div>

          {/* Legal */}
          <div className="footer-column">
            <h4>Legal</h4>

            <button
              type="button"
              className="footer-action"
              onClick={() => setActiveModal("privacy")}
            >
              Privacy
            </button>

            <button
              type="button"
              className="footer-action"
              onClick={() => setActiveModal("terms")}
            >
              Terms
            </button>

            <button
              type="button"
              className="footer-action"
              onClick={() => setActiveModal("security")}
            >
              Security
            </button>
          </div>

          {/* Subscription */}
          <div className="footer-subscribe">
            <span className="footer-subscribe-label">
              STAY IN THE LOOP
            </span>

            <h3>Keep up with Forma AI.</h3>

            <p>
              Get occasional updates about new features
              and improvements.
            </p>

            {!subscribed ? (
              <form
                className="footer-subscribe-form"
                onSubmit={handleSubscribe}
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />

                <button type="submit">
                  Subscribe →
                </button>
              </form>
            ) : (
              <div className="footer-subscribe-success">
                <span>✓</span>

                <div>
                  <strong>You're on the list.</strong>

                  <p>
                    Thanks for staying connected with Forma AI.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer bottom */}
        <div className="footer-bottom">
          <span>© 2026 Forma AI. All rights reserved.</span>

          <span className="footer-status">
            <span className="status-dot" />
            Built for better insurance experiences
          </span>
        </div>
      </footer>

      {/* Modal */}
      {activeModal && (
        <div
          className="footer-modal-overlay"
          onClick={closeModal}
        >
          <div
            className="footer-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="footer-modal-close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              ×
            </button>

            {/* Features */}
            {activeModal === "features" && (
              <>
                <span className="footer-modal-label">
                  FEATURES
                </span>

                <h3>Built around a simpler claim experience.</h3>

                <p>
                  Forma AI brings structured insurance workflows,
                  intelligent assistance, and a clear user
                  experience together in one place.
                </p>

                <div className="footer-info-points">
                  <span>✓ Guided insurance workflows</span>
                  <span>✓ AI-assisted information extraction</span>
                  <span>✓ Clear claim progress</span>
                </div>

                <button
                  type="button"
                  className="footer-modal-button"
                  onClick={closeModal}
                >
                  Close
                </button>
              </>
            )}

            {/* Claims */}
            {activeModal === "claims" && (
              <>
                <span className="footer-modal-label">
                  CLAIMS
                </span>

                <h3>Make the claim process easier.</h3>

                <p>
                  Start with your story, review the information,
                  and move through your claim with a structured
                  experience designed to reduce unnecessary
                  complexity.
                </p>

                <div className="footer-info-points">
                  <span>01 — Tell us what happened</span>
                  <span>02 — Review your information</span>
                  <span>03 — Continue your claim</span>
                </div>

                <button
                  type="button"
                  className="footer-modal-button"
                  onClick={closeModal}
                >
                  Close
                </button>
              </>
            )}

            {/* How it works */}
            {activeModal === "how-it-works" && (
              <>
                <span className="footer-modal-label">
                  HOW IT WORKS
                </span>

                <h3>From your story to a structured claim.</h3>

                <p>
                  Forma AI helps transform the information you
                  provide into a clearer, more structured workflow
                  while keeping you in control.
                </p>

                <div className="footer-info-points">
                  <span>01 — Share your information</span>
                  <span>02 — AI helps structure the details</span>
                  <span>03 — Review before moving forward</span>
                </div>

                <button
                  type="button"
                  className="footer-modal-button"
                  onClick={closeModal}
                >
                  Close
                </button>
              </>
            )}

            {/* About */}
            {activeModal === "about" && (
              <>
                <span className="footer-modal-label">
                  ABOUT FORMA AI
                </span>

                <h3>Insurance workflows, made simpler.</h3>

                <p>
                  Forma AI is designed around one simple idea:
                  insurance processes should be easier to understand
                  and easier to navigate.
                </p>

                <div className="footer-about-card">
                  <strong>Our focus</strong>

                  <span>
                    Simplicity, clarity, and thoughtful AI
                    assistance for insurance workflows.
                  </span>
                </div>

                <button
                  type="button"
                  className="footer-modal-button"
                  onClick={closeModal}
                >
                  Close
                </button>
              </>
            )}

            {/* Support */}
            {activeModal === "support" && (
              <>
                <span className="footer-modal-label">
                  SUPPORT
                </span>

                <h3>How can we help?</h3>

                <p>
                  Need help with your claim or having trouble
                  using Forma AI? Our support team is here to
                  help.
                </p>

                <div className="footer-support-card">
                  <strong>Forma AI Support</strong>
                  <span>support@forma.ai</span>
                </div>

                <button
                  type="button"
                  className="footer-modal-button"
                  onClick={closeModal}
                >
                  Got it
                </button>
              </>
            )}

            {/* Contact */}
            {activeModal === "contact" && (
              <>
                <span className="footer-modal-label">
                  CONTACT
                </span>

                <h3>We'd love to hear from you.</h3>

                <p>
                  Have a question, suggestion, or want to learn
                  more about Forma AI? Reach out to our team.
                </p>

                <div className="footer-contact-card">
                  <div>
                    <span>General</span>
                    <strong>hello@forma.ai</strong>
                  </div>

                  <div>
                    <span>Support</span>
                    <strong>support@forma.ai</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="footer-modal-button"
                  onClick={closeModal}
                >
                  Close
                </button>
              </>
            )}

            {/* Privacy */}
            {activeModal === "privacy" && (
              <>
                <span className="footer-modal-label">
                  PRIVACY
                </span>

                <h3>Your information matters.</h3>

                <p>
                  Forma AI is designed to keep your insurance
                  information within a clear and controlled
                  experience. You remain in control of the
                  information you provide.
                </p>

                <div className="footer-privacy-points">
                  <span>✓ Clear information handling</span>
                  <span>✓ User-controlled claim details</span>
                  <span>✓ Transparent AI assistance</span>
                </div>

                <button
                  type="button"
                  className="footer-modal-button"
                  onClick={closeModal}
                >
                  Close
                </button>
              </>
            )}

            {/* Terms */}
            {activeModal === "terms" && (
              <>
                <span className="footer-modal-label">
                  TERMS
                </span>

                <h3>Using Forma AI responsibly.</h3>

                <p>
                  Forma AI provides tools to help organize and
                  simplify insurance workflows. Information shown
                  through the platform should be reviewed before
                  being submitted or relied upon.
                </p>

                <div className="footer-info-points">
                  <span>✓ Review information before submission</span>
                  <span>✓ Keep your account information secure</span>
                  <span>✓ Use the platform responsibly</span>
                </div>

                <button
                  type="button"
                  className="footer-modal-button"
                  onClick={closeModal}
                >
                  Close
                </button>
              </>
            )}

            {/* Security */}
            {activeModal === "security" && (
              <>
                <span className="footer-modal-label">
                  SECURITY
                </span>

                <h3>Security is part of the experience.</h3>

                <p>
                  Forma AI is designed with a focus on responsible
                  handling of information and clear user control
                  throughout the insurance workflow.
                </p>

                <div className="footer-info-points">
                  <span>✓ Controlled access to information</span>
                  <span>✓ Clear user interactions</span>
                  <span>✓ Security-conscious workflows</span>
                </div>

                <button
                  type="button"
                  className="footer-modal-button"
                  onClick={closeModal}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;