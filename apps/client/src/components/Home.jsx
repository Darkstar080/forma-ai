import { useState } from "react";
import "./Home.css";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import { Link } from "react-router-dom";

import {
  HeroSection,
  QuickActions,
  HowItWorks,
  FeaturesSection,
  ClaimPreview,
  TrustSection,
  CTASection,
} from "./HomeSections";

function Home({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="forma-home">
      <header className="forma-navbar">
        <div className="forma-navbar-inner">
          <div className="forma-logo">
            Forma<span>AI</span>
          </div>

          <nav className="forma-nav">
            <a href="#how-it-works">How it works</a>
            <a href="#features">Features</a>
            <a href="#claims">Claims</a>
            <a href="#support">Support</a>
          </nav>

<Link to="/claim" className="forma-nav-cta">
            Start a claim
          </Link>

          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? "×" : "☰"}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-nav">
            <a href="#how-it-works" onClick={closeMobileMenu}>
              How it works
            </a>

            <a href="#features" onClick={closeMobileMenu}>
              Features
            </a>

            <a href="#claims" onClick={closeMobileMenu}>
              Claims
            </a>

            <a href="#support" onClick={closeMobileMenu}>
              Support
            </a>

            <Link
              to="/claim"
              className="mobile-nav-cta"
              onClick={closeMobileMenu}
            >
              Start a claim →
            </Link>
          </div>
        )}
      </header>

      <main>
        <HeroSection />
        <QuickActions />
        <HowItWorks />
        <FeaturesSection />
        <ClaimPreview />

        <section className="existing-form-section">
          {children}
        </section>

        <TrustSection />
        <CTASection />
      </main>

      <Footer />

      <ScrollToTop />
    </div>
  );
}

export default Home;