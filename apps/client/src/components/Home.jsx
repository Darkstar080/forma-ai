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

          <button className="forma-nav-cta">Start a claim</button>
        </div>
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
    </div>
  );
}

export default Home;