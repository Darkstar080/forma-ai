import { useState } from "react";
import "./Home.css";
import Footer from "./Footer";

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

  const scrollToClaim = () => {
    document
      .querySelector(".existing-form-section")
      ?.scrollIntoView({ behavior: "smooth" });

    closeMobileMenu();
  };

  return (
    <div className="forma-home">
      <header className="forma-navbar">
        <div className="forma-navbar-inner">
          <div className="forma-logo">
            Forma<span>AI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="forma-nav">
            <a href="#how-it-works">How it works</a>
            <a href="#features">Features</a>
            <a href="#claims">Claims</a>
            <a href="#support">Support</a>
          </nav>

          <button
            className="forma-nav-cta"
            onClick={scrollToClaim}
          >
            Start a claim
          </button>

          {/* Mobile Menu Button */}
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

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="mobile-nav">
            <a
              href="#how-it-works"
              onClick={closeMobileMenu}
            >
              How it works
            </a>

            <a
              href="#features"
              onClick={closeMobileMenu}
            >
              Features
            </a>

            <a
              href="#claims"
              onClick={closeMobileMenu}
            >
              Claims
            </a>

            <a
              href="#support"
              onClick={closeMobileMenu}
            >
              Support
            </a>

            <button
              type="button"
              className="mobile-nav-cta"
              onClick={scrollToClaim}
            >
              Start a claim →
            </button>
          </div>
        )}
      </header>

      <main>
        <HeroSection />

        <QuickActions />

        <HowItWorks />

        <FeaturesSection />

        <ClaimPreview />

        {/* Existing team-owned form */}
        <section className="existing-form-section">
          {children}
        </section>

        <TrustSection />

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}

export default Home;