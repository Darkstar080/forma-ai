import "./ClaimPreview.css";

const sections = [
  {
    title: "Policyholder & Policy",
    fields: [
      ["Policyholder name", "policyholderName"],
      ["Policy number", "policyNumber"],
      ["Phone", "phone"],
      ["Email", "email"],
      ["Address", "address"],
    ],
  },
  {
    title: "Incident Details",
    fields: [
      ["Incident type", "incidentType"],
      ["Date", "incidentDate"],
      ["Time", "incidentTime"],
      ["Location", "incidentLocation"],
      ["Description", "incidentDescription"],
      ["Weather / road conditions", "weatherConditions"],
    ],
  },
  {
    title: "Your Vehicle",
    fields: [
      ["Make", "vehicleMake"],
      ["Model", "vehicleModel"],
      ["Year", "vehicleYear"],
      ["Registration / plate", "vehiclePlate"],
      ["Condition", "vehicleStatus"],
    ],
  },
  {
    title: "Damage Information",
    fields: [
      ["Damaged areas", "damagedAreas"],
      ["Damage description", "damageDescription"],
      ["Estimated repair cost", "estimatedDamage"],
    ],
  },
  {
    title: "Other Party",
    fields: [
      ["Other party involved", "otherPartyInvolved"],
      ["Name", "otherPartyName"],
      ["Phone", "otherPartyPhone"],
      ["Vehicle make", "otherVehicleMake"],
      ["Vehicle model", "otherVehicleModel"],
      ["Vehicle plate", "otherVehiclePlate"],
      ["Insurance company", "otherInsuranceCompany"],
      ["Policy number", "otherPolicyNumber"],
    ],
  },
  {
    title: "Police, Injuries & Witnesses",
    fields: [
      ["Police contacted", "policeContacted"],
      ["Police report number", "policeReportNumber"],
      ["Emergency services", "emergencyServices"],
      ["Injuries", "injuries"],
      ["Witness information", "witnessInformation"],
    ],
  },
];

function ClaimPreview({ claimData, description, onEdit, onGenerate }) {
  return (
    <div className="claim-preview">
      <div className="claim-preview-header">
        <div>
          <span className="preview-kicker">FORMA AI</span>
          <h1>Review your claim</h1>
          <p>
            Please review the information below before generating your
            claim document.
          </p>
        </div>

        <span className="preview-status">READY FOR REVIEW</span>
      </div>

      {description && (
        <div className="preview-description">
          <span>ORIGINAL DESCRIPTION</span>
          <p>“{description}”</p>
        </div>
      )}

      <div className="preview-sections">
        {sections.map((section) => (
          <section className="preview-section" key={section.title}>
            <div className="preview-section-heading">
              <h2>{section.title}</h2>
            </div>

            <div className="preview-grid">
              {section.fields.map(([label, key]) => {
                const value = claimData?.[key];

                if (
                  value === undefined ||
                  value === null ||
                  String(value).trim() === ""
                ) {
                  return null;
                }

                return (
                  <div className="preview-field" key={key}>
                    <span>{label}</span>
                    <strong>{String(value)}</strong>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="preview-actions">
        <button
          type="button"
          className="preview-edit-button"
          onClick={onEdit}
        >
          ← Edit claim
        </button>

        <button
          type="button"
          className="preview-generate-button"
          onClick={onGenerate}
        >
          Generate claim document →
        </button>
      </div>
    </div>
  );
}

export default ClaimPreview;