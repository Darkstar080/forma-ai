import ClaimNavbar from "./sections/ClaimNavbar";
import "./ClaimExperience.css";

function ClaimExperience() {
  return (
    <div className="claim-experience">
      <ClaimNavbar />

      <main className="claim-page-content">
        <section className="claim-intro">
          <span className="claim-eyebrow">FORMA AI</span>

          <h1>
            Insurance claims,
            <br />
            <span>made simpler.</span>
          </h1>

          <p>
            A smarter way to start, complete, and manage
            complex insurance claims.
          </p>

          <button className="claim-primary-button">
            Start a claim
            <span>→</span>
          </button>
        </section>
      </main>
    </div>
  );
}

export default ClaimExperience;