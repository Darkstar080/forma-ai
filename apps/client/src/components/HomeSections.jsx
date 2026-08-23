function HeroSection() {
  return (
    <section className="home-hero">
      <div className="hero-content">
        <p className="eyebrow">FORMA AI</p>

        <h1>
          Insurance should
          <br />
          <span>feel simple.</span>
        </h1>

        <p className="hero-description">
          Tell us what happened in your own words.
          Forma AI helps turn complex insurance workflows
          into a clear, guided experience.
        </p>

        <div className="story-card">
          <div className="story-card-top">
            <span>Tell us what happened</span>
            <span className="story-label">AI assisted</span>
          </div>

          <div className="story-input">
            I hit a deer on I-95 yesterday in my Honda,
            and the windshield shattered.
          </div>

          <div className="story-card-bottom">
            <span>Describe your situation naturally.</span>

            <button className="primary-action">
              Start a claim <span>→</span>
            </button>
          </div>
        </div>

        <p className="hero-footnote">
          No long forms. No unnecessary questions.
        </p>
      </div>
    </section>
  );
}

function QuickActions() {
  return (
    <section className="quick-actions">
      <div className="quick-actions-inner">
        <div className="quick-intro">
          <p className="eyebrow">GET STARTED</p>
          <h2>What would you like to do?</h2>
        </div>

        <div className="quick-grid">
          <div className="quick-card">
            <div className="quick-icon">+</div>
            <div>
              <h3>Start a new claim</h3>
              <p>Tell us what happened and we'll guide you through it.</p>
            </div>
            <span className="arrow">→</span>
          </div>

          <div className="quick-card">
            <div className="quick-icon">↗</div>
            <div>
              <h3>Continue a claim</h3>
              <p>Pick up where you left off with a saved draft.</p>
            </div>
            <span className="arrow">→</span>
          </div>

          <div className="quick-card">
            <div className="quick-icon">○</div>
            <div>
              <h3>View my claims</h3>
              <p>Check the status of your existing claims.</p>
            </div>
            <span className="arrow">→</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Tell us your story",
      text: "Describe what happened naturally instead of working through a long list of questions.",
    },
    {
      number: "02",
      title: "We understand the details",
      text: "Forma AI identifies the information that matters and prepares your claim.",
    },
    {
      number: "03",
      title: "Review and continue",
      text: "You review the information and answer only the questions that are relevant.",
    },
  ];

  return (
    <section className="how-section" id="how-it-works">
      <div className="section-container">
        <div className="section-heading">
          <p className="eyebrow">HOW IT WORKS</p>

          <h2>
            A better way to
            <br />
            start a claim.
          </h2>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <article className="step-item" key={step.number}>
              <span className="step-number">{step.number}</span>

              <h3>{step.title}</h3>

              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "AI-assisted",
      text: "Start with your own words and let intelligent extraction do the initial work.",
    },
    {
      title: "Only what matters",
      text: "Dynamic questions keep the experience focused on your specific situation.",
    },
    {
      title: "Always in control",
      text: "Review and correct information before moving forward with your claim.",
    },
    {
      title: "Save and resume",
      text: "Save your progress and return whenever you're ready to continue.",
    },
  ];

  return (
    <section className="features-section" id="features">
      <div className="section-container">
        <div className="features-header">
          <div>
            <p className="eyebrow">WHY FORMA AI</p>
            <h2>Less paperwork. More clarity.</h2>
          </div>

          <p>
            Designed for complex insurance workflows without
            making the experience feel complicated.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <article className="feature-card" key={feature.title}>
              <span className="feature-number">
                0{index + 1}
              </span>

              <h3>{feature.title}</h3>

              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClaimPreview() {
  return (
    <section className="claim-preview-section" id="claims">
      <div className="section-container">
        <div className="claim-preview-heading">
          <p className="eyebrow">YOUR CLAIM</p>

          <h2>
            Everything important,
            <br />
            in one place.
          </h2>

          <p>
            Your claim experience stays clear from the first
            description to the final review.
          </p>
        </div>

        <div className="claim-preview-card">
          <div className="claim-preview-top">
            <div>
              <span className="claim-status">IN PROGRESS</span>
              <h3>Auto Insurance Claim</h3>
              <p>Honda · Animal collision</p>
            </div>

            <span className="claim-progress-value">65%</span>
          </div>

          <div className="progress-track">
            <div className="progress-value" />
          </div>

          <div className="claim-preview-bottom">
            <span>Last updated today</span>
            <button>Continue claim →</button>
          </div>
        </div>

        <div className="form-preview">
          <div className="form-preview-header">
            <div>
              <p className="eyebrow">CLAIM DETAILS</p>
              <h3>Complete your claim</h3>
            </div>

            <span>Step 2 of 4</span>
          </div>

          <div className="form-preview-progress">
            <span />
          </div>

          <div className="preview-fields">
            <div>
              <label>Incident type</label>
              <div>Animal collision</div>
            </div>

            <div>
              <label>Vehicle</label>
              <div>Honda</div>
            </div>

            <div>
              <label>Incident date</label>
              <div>August 22, 2026</div>
            </div>

            <div>
              <label>Damage</label>
              <div>Windshield</div>
            </div>
          </div>

          <p className="preview-note">
            This area is reserved for the existing dynamic
            claim form and will be connected without changing
            its core functionality.
          </p>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="trust-section">
      <div className="section-container trust-layout">
        <div>
          <p className="eyebrow">BUILT WITH CARE</p>

          <h2>
            Complex workflows
            <br />
            deserve a simple experience.
          </h2>

          <p className="trust-description">
            Forma AI combines intelligent assistance with
            structured workflows while keeping people in
            control of their information.
          </p>
        </div>

        <div className="trust-list">
          <div>
            <span>✓</span>
            <div>
              <strong>Transparent assistance</strong>
              <p>Review information before moving forward.</p>
            </div>
          </div>

          <div>
            <span>✓</span>
            <div>
              <strong>Structured workflows</strong>
              <p>Complex forms remain clear and organized.</p>
            </div>
          </div>

          <div>
            <span>✓</span>
            <div>
              <strong>Designed for real people</strong>
              <p>Less friction without removing user control.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-card">
        <p className="eyebrow">FORMA AI</p>

        <h2>
          Ready to make your
          <br />
          claim simpler?
        </h2>

        <p>
          Start with your story. We'll help with the rest.
        </p>

        <button className="primary-action">
          Start a claim <span>→</span>
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="forma-footer" id="support">
      <div className="footer-inner">
        <div>
          <div className="footer-logo">
            Forma<span>AI</span>
          </div>

          <p>Insurance workflows, simplified.</p>
        </div>

        <div className="footer-links">
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>
          <a href="#claims">Claims</a>
          <a href="#support">Support</a>
          <a href="#privacy">Privacy</a>
        </div>

        <p className="footer-copy">© 2026 Forma AI</p>
      </div>
    </footer>
  );
}

export {
  HeroSection,
  QuickActions,
  HowItWorks,
  FeaturesSection,
  ClaimPreview,
  TrustSection,
  CTASection,
  Footer,
};