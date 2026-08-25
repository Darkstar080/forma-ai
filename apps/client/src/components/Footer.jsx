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

  return (
    <>
      <footer className="forma-footer-new">
        <div className="footer-main">
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

          <div className="footer-column">
            <h4>Product</h4>

            <a href="#features">Features</a>
            <a href="#claims">Claims</a>
            <a href="#how-it-works">How it works</a>
          </div>

          <div className="footer-column">
            <h4>Company</h4>

            <a href="#about">About Forma AI</a>

            <button
              type="button"
              className="footer-action"
              onClick={() => setActiveModal("support")}
            >
              Support
            </button>

            <a href="#contact">Contact</a>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>

            <button
              type="button"
              className="footer-action"
              onClick={() => setActiveModal("privacy")}
            >
              Privacy
            </button>

            <a href="#terms">Terms</a>
            <a href="#security">Security</a>
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
          onClick={() => setActiveModal(null)}
        >
          <div
            className="footer-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="footer-modal-close"
              onClick={() => setActiveModal(null)}
              aria-label="Close"
            >
              ×
            </button>

            {activeModal === "support" ? (
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
                  onClick={() => setActiveModal(null)}
                >
                  Got it
                </button>
              </>
            ) : (
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
                  onClick={() => setActiveModal(null)}
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