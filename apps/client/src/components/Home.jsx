import { useEffect, useRef, useState } from "react";
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

/* =========================================================
   SCROLL REVEAL
========================================================= */

function ScrollReveal({ children, className = "" }) {
  const revealRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = revealRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={revealRef}
      className={`forma-reveal ${
        isVisible ? "is-visible" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Home({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("forma-theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("forma-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setDarkMode((current) => !current);
  };

  return (
    <div
      className={`forma-home ${
        darkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <style>{`
        /* =====================================================
           FORMA AI GLOBAL DARK / LIGHT THEME
        ===================================================== */

        .forma-home {
          --theme-bg: #f6f3ec;
          --theme-surface: #ffffff;
          --theme-surface-soft: #eeebe3;
          --theme-text: #1c1c19;
          --theme-text-secondary: #6f706b;
          --theme-border: #ddd9d0;
          --theme-input: #f8f6f1;
          --theme-accent: #e85d3f;
          --theme-accent-dark: #cf4d32;
        }

        .forma-home.dark-mode {
          --theme-bg: #0d1117;
          --theme-surface: #151b23;
          --theme-surface-soft: #111820;
          --theme-text: #f4f6f8;
          --theme-text-secondary: #a7afbc;
          --theme-border: #29323d;
          --theme-input: #10161e;
          --theme-accent: #ff7658;
          --theme-accent-dark: #ff6848;

          background: var(--theme-bg) !important;
          color: var(--theme-text) !important;
        }

        /* ---------- Navbar ---------- */

        .forma-home.dark-mode .forma-navbar {
          background: rgba(13, 17, 23, 0.9) !important;
          border-color: var(--theme-border) !important;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18);
        }

        .forma-home.dark-mode .forma-navbar:hover {
          background: rgba(13, 17, 23, 0.97) !important;
        }

        .forma-home.dark-mode .forma-logo {
          color: var(--theme-text) !important;
        }

        .forma-home.dark-mode .forma-nav {
          color: var(--theme-text-secondary) !important;
        }

        .forma-home.dark-mode .forma-nav a:hover {
          color: var(--theme-text) !important;
        }

        .forma-home.dark-mode .forma-nav-cta {
          background: var(--theme-accent) !important;
        }

        /* ---------- Mobile menu ---------- */

        .forma-home.dark-mode .mobile-menu-button {
          background: var(--theme-surface) !important;
          border-color: var(--theme-border) !important;
          color: var(--theme-text) !important;
        }

        .forma-home.dark-mode .mobile-nav {
          background: var(--theme-surface) !important;
          border-color: var(--theme-border) !important;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
        }

        .forma-home.dark-mode .mobile-nav a {
          color: var(--theme-text-secondary) !important;
        }

        /* ---------- Hero ---------- */

        .forma-home.dark-mode .home-hero {
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(255, 118, 88, 0.12),
              transparent 40%
            ),
            var(--theme-bg) !important;
        }

        .forma-home.dark-mode .hero-content h1 {
          color: var(--theme-text) !important;
        }

        .forma-home.dark-mode .hero-description,
        .forma-home.dark-mode .hero-footnote {
          color: var(--theme-text-secondary) !important;
        }

        .forma-home.dark-mode .story-card {
          background: var(--theme-surface) !important;
          border-color: var(--theme-border) !important;
          box-shadow:
            0 25px 60px rgba(0, 0, 0, 0.28),
            0 2px 8px rgba(0, 0, 0, 0.18);
        }

        .forma-home.dark-mode .story-card-top,
        .forma-home.dark-mode .story-card-bottom {
          color: var(--theme-text) !important;
        }

        .forma-home.dark-mode .story-input {
          background: var(--theme-input) !important;
          color: #d9dee6 !important;
        }

        .forma-home.dark-mode .story-card-bottom {
          color: var(--theme-text-secondary) !important;
        }

        /* ---------- Quick actions ---------- */

        .forma-home.dark-mode .quick-actions {
          background: var(--theme-surface-soft) !important;
          border-color: var(--theme-border) !important;
        }

        .forma-home.dark-mode .quick-intro h2 {
          color: var(--theme-text) !important;
        }

        .forma-home.dark-mode .quick-card {
          background: var(--theme-surface) !important;
          border-color: var(--theme-border) !important;
        }

        .forma-home.dark-mode .quick-card h3 {
          color: var(--theme-text) !important;
        }

        .forma-home.dark-mode .quick-card p {
          color: var(--theme-text-secondary) !important;
        }

        /* ---------- Generic sections ---------- */

        .forma-home.dark-mode .how-section,
        .forma-home.dark-mode .features-section,
        .forma-home.dark-mode .claim-preview-section,
        .forma-home.dark-mode .trust-section {
          background: var(--theme-bg) !important;
          color: var(--theme-text) !important;
        }

        .forma-home.dark-mode .section-heading h2,
        .forma-home.dark-mode .features-header h2,
        .forma-home.dark-mode .claim-preview-heading h2,
        .forma-home.dark-mode .trust-section h2 {
          color: var(--theme-text) !important;
        }

        .forma-home.dark-mode .features-header > p,
        .forma-home.dark-mode .claim-preview-heading > p,
        .forma-home.dark-mode .trust-description {
          color: var(--theme-text-secondary) !important;
        }

        /* ---------- How it works ---------- */

        .forma-home.dark-mode .step-item {
          border-color: var(--theme-border) !important;
        }

        .forma-home.dark-mode .step-item h3 {
          color: var(--theme-text) !important;
        }

        .forma-home.dark-mode .step-item p {
          color: var(--theme-text-secondary) !important;
        }

        /* ---------- Features ---------- */

        .forma-home.dark-mode .feature-card {
          background: var(--theme-surface) !important;
          border-color: var(--theme-border) !important;
        }

        .forma-home.dark-mode .feature-card h3 {
          color: var(--theme-text) !important;
        }

        .forma-home.dark-mode .feature-card p {
          color: var(--theme-text-secondary) !important;
        }

        /* ---------- Claim preview ---------- */

        .forma-home.dark-mode .claim-preview-card,
        .forma-home.dark-mode .form-preview {
          background: var(--theme-surface) !important;
          border-color: var(--theme-border) !important;
          color: var(--theme-text) !important;
        }

        .forma-home.dark-mode .claim-preview-card h3,
        .forma-home.dark-mode .form-preview h3 {
          color: var(--theme-text) !important;
        }

        .forma-home.dark-mode .claim-preview-card p,
        .forma-home.dark-mode .claim-preview-bottom,
        .forma-home.dark-mode .form-preview-header > span {
          color: var(--theme-text-secondary) !important;
        }

        .forma-home.dark-mode .progress-track {
          background: #29323d !important;
        }

        .forma-home.dark-mode .preview-fields > div {
          background: var(--theme-input) !important;
          border-color: var(--theme-border) !important;
        }

        .forma-home.dark-mode .preview-fields label {
          color: #8f99a8 !important;
        }

        .forma-home.dark-mode .preview-fields div {
          color: var(--theme-text) !important;
        }

        .forma-home.dark-mode .preview-note {
          background: #18202a !important;
          color: var(--theme-text-secondary) !important;
        }

        /* ---------- Trust ---------- */

        .forma-home.dark-mode .trust-list > div {
          border-color: var(--theme-border) !important;
        }

        .forma-home.dark-mode .trust-list strong {
          color: var(--theme-text) !important;
        }

        .forma-home.dark-mode .trust-list p {
          color: var(--theme-text-secondary) !important;
        }

        /* ---------- CTA ---------- */

        .forma-home.dark-mode .cta-section {
          background: var(--theme-bg) !important;
        }

        .forma-home.dark-mode .cta-card {
          background: #202721 !important;
          border-color: #303b34 !important;
        }

        .forma-home.dark-mode .cta-card h2 {
          color: #ffffff !important;
        }

        .forma-home.dark-mode .cta-card > p {
          color: #aeb7b0 !important;
        }

        /* ---------- Existing dynamic form area ---------- */

        .forma-home.dark-mode .existing-form-section {
          background: var(--theme-bg) !important;
          color: var(--theme-text) !important;
        }

        /* ---------- Footer ---------- */

        .forma-home.dark-mode .forma-footer-new {
          background: #080c11 !important;
          color: #ffffff !important;
        }

        .forma-home.dark-mode .footer-logo-new {
          color: #ffffff !important;
        }

        .forma-home.dark-mode .footer-brand p,
        .forma-home.dark-mode .footer-action {
          color: #8993a1 !important;
        }

        .forma-home.dark-mode .footer-column h4 {
          color: #f1f3f6 !important;
        }

        .forma-home.dark-mode .footer-action:hover {
          color: #ffffff !important;
        }

        .forma-home.dark-mode .footer-subscribe {
          background: #111820 !important;
          border-color: #29323d !important;
        }

        .forma-home.dark-mode .footer-subscribe h3 {
          color: #ffffff !important;
        }

        .forma-home.dark-mode .footer-subscribe > p {
          color: #8993a1 !important;
        }

        .forma-home.dark-mode .footer-subscribe-form input {
          background: #0b1016 !important;
          border-color: #303a46 !important;
          color: #ffffff !important;
        }

        .forma-home.dark-mode .footer-subscribe-success {
          background: #17241c !important;
        }

        .forma-home.dark-mode .footer-subscribe-success strong {
          color: #ffffff !important;
        }

        .forma-home.dark-mode .footer-subscribe-success p {
          color: #899d90 !important;
        }

        .forma-home.dark-mode .footer-bottom {
          border-color: #29323d !important;
          color: #697482 !important;
        }

        /* ---------- Footer modal ---------- */

        .forma-home.dark-mode .footer-modal-overlay {
          background: rgba(0, 0, 0, 0.72) !important;
        }

        .forma-home.dark-mode .footer-modal {
          background: #151b23 !important;
          border-color: #303945 !important;
          color: #ffffff !important;
        }

        .forma-home.dark-mode .footer-modal h3 {
          color: #ffffff !important;
        }

        .forma-home.dark-mode .footer-modal > p {
          color: #a7afbc !important;
        }

        .forma-home.dark-mode .footer-modal-close {
          background: #222a34 !important;
          color: #dbe1e8 !important;
        }

        .forma-home.dark-mode .footer-modal-close:hover {
          background: #2c3541 !important;
        }

        .forma-home.dark-mode .footer-info-points,
        .forma-home.dark-mode .footer-about-card,
        .forma-home.dark-mode .footer-support-card {
          background: #10161e !important;
          color: #a7afbc !important;
        }

        .forma-home.dark-mode .footer-about-card strong,
        .forma-home.dark-mode .footer-support-card strong {
          color: #ffffff !important;
        }

        .forma-home.dark-mode .footer-about-card span,
        .forma-home.dark-mode .footer-support-card span {
          color: #9aa4b2 !important;
        }

        .forma-home.dark-mode .footer-contact-card {
          border-color: #303945 !important;
        }

        .forma-home.dark-mode .footer-contact-card div {
          background: #10161e !important;
        }

        .forma-home.dark-mode .footer-contact-card div + div {
          border-color: #303945 !important;
        }

        .forma-home.dark-mode .footer-contact-card span {
          color: #8d97a5 !important;
        }

        .forma-home.dark-mode .footer-contact-card strong {
          color: #ffffff !important;
        }

        .forma-home.dark-mode .footer-privacy-points {
          background: #292019 !important;
          color: #b4aaa0 !important;
        }

        /* ---------- Theme toggle ---------- */

        .forma-theme-toggle {
          width: 38px;
          height: 38px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          border: 1px solid var(--theme-border);
          border-radius: 50%;

          background: var(--theme-surface);
          color: var(--theme-text);

          font-size: 16px;
          line-height: 1;

          cursor: pointer;

          transition:
            background 0.2s ease,
            border-color 0.2s ease,
            transform 0.2s ease;
        }

        .forma-theme-toggle:hover {
          transform: translateY(-1px);
        }

        .forma-theme-toggle:active {
          transform: scale(0.94);
        }

        .forma-mobile-theme {
          width: 100%;
          padding: 11px 12px;

          border: 1px solid var(--theme-border);
          border-radius: 9px;

          background: var(--theme-surface);
          color: var(--theme-text);

          font-size: 12px;
          font-weight: 600;

          cursor: pointer;
          text-align: left;
        }

        /* ---------- Smooth transition ---------- */

        .forma-home,
        .forma-home .forma-navbar,
        .forma-home .home-hero,
        .forma-home .quick-actions,
        .forma-home .quick-card,
        .forma-home .story-card,
        .forma-home .feature-card,
        .forma-home .claim-preview-card,
        .forma-home .form-preview,
        .forma-home .footer-subscribe,
        .forma-home .footer-modal {
          transition:
            background-color 0.28s ease,
            border-color 0.28s ease,
            color 0.28s ease,
            box-shadow 0.28s ease;
        }

        @media (max-width: 700px) {
          .forma-theme-toggle {
            display: none;
          }
        }
      `}</style>

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

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <button
              type="button"
              className="forma-theme-toggle"
              onClick={toggleTheme}
              aria-label={
                darkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              title={darkMode ? "Light mode" : "Dark mode"}
            >
              {darkMode ? "☀" : "☾"}
            </button>

            <Link to="/claim" className="forma-nav-cta">
              Start a claim
            </Link>
          </div>

          <button
            type="button"
            className="mobile-menu-button"
            onClick={() =>
              setMobileMenuOpen((open) => !open)
            }
            aria-label={
              mobileMenuOpen ? "Close menu" : "Open menu"
            }
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? "×" : "☰"}
          </button>
        </div>

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
              className="forma-mobile-theme"
              onClick={toggleTheme}
            >
              {darkMode
                ? "☀  Light mode"
                : "☾  Dark mode"}
            </button>

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
        <ScrollReveal className="forma-reveal-hero">
          <HeroSection />
        </ScrollReveal>

        <ScrollReveal className="forma-reveal-delay-1">
          <QuickActions />
        </ScrollReveal>

        <ScrollReveal className="forma-reveal-delay-2">
          <HowItWorks />
        </ScrollReveal>

        <ScrollReveal className="forma-reveal-delay-3">
          <FeaturesSection />
        </ScrollReveal>

        <ScrollReveal className="forma-reveal-delay-4">
          <ClaimPreview />
        </ScrollReveal>

        <ScrollReveal className="forma-reveal-delay-5">
          <section className="existing-form-section">
            {children}
          </section>
        </ScrollReveal>

        <ScrollReveal className="forma-reveal-delay-6">
          <TrustSection />
        </ScrollReveal>

        <ScrollReveal className="forma-reveal-delay-7">
          <CTASection />
        </ScrollReveal>
      </main>

      <Footer />

      <ScrollToTop />
    </div>
  );
}

export default Home;