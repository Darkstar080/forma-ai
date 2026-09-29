import { useMemo, useState } from "react";
import "./MagicClaimForm.css";

const getValue = (data, aliases) => {
  for (const key of aliases) {
    const value = data?.[key];

    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      return value;
    }
  }

  return "";
};

const initialForm = (data = {}) => ({
  policyholderName: getValue(data, [
    "policyholderName",
    "claimantName",
    "insuredName",
    "fullName",
    "name",
  ]),

  policyNumber: getValue(data, [
    "policyNumber",
    "policyNo",
  ]),

  phone: getValue(data, [
    "phone",
    "phoneNumber",
    "contactNumber",
  ]),

  email: getValue(data, [
    "email",
    "emailAddress",
  ]),

  address: getValue(data, [
    "address",
    "policyholderAddress",
    "insuredAddress",
  ]),

  incidentType: getValue(data, [
    "incidentType",
    "claimType",
  ]),

  incidentDate: getValue(data, [
    "incidentDate",
    "dateOfIncident",
    "date",
  ]),

  incidentTime: getValue(data, [
    "incidentTime",
    "timeOfIncident",
    "time",
  ]),

  incidentLocation: getValue(data, [
    "incidentLocation",
    "location",
    "accidentLocation",
  ]),

  incidentDescription: getValue(data, [
    "incidentDescription",
    "description",
    "accidentDescription",
  ]),

  weatherConditions: getValue(data, [
    "weatherConditions",
    "weather",
    "roadConditions",
  ]),

  vehicleMake: getValue(data, [
    "vehicleMake",
    "make",
  ]),

  vehicleModel: getValue(data, [
    "vehicleModel",
    "model",
  ]),

  vehicleYear: getValue(data, [
    "vehicleYear",
    "year",
  ]),

  vehiclePlate: getValue(data, [
    "vehiclePlate",
    "vehicleRegistration",
    "licensePlate",
    "plate",
  ]),

  vehicleStatus: getValue(data, [
    "vehicleStatus",
    "vehicleCondition",
  ]),

  damagedAreas: getValue(data, [
    "damagedAreas",
    "damage",
    "damageArea",
  ]),

  damageDescription: getValue(data, [
    "damageDescription",
    "damageDetails",
  ]),

  estimatedDamage: getValue(data, [
    "estimatedDamage",
    "estimatedCost",
    "damageEstimate",
  ]),

  otherPartyInvolved: getValue(data, [
    "otherPartyInvolved",
    "thirdPartyInvolved",
  ]),

  otherPartyName: getValue(data, [
    "otherPartyName",
    "otherDriverName",
    "thirdPartyName",
  ]),

  otherPartyPhone: getValue(data, [
    "otherPartyPhone",
    "otherDriverPhone",
    "thirdPartyPhone",
  ]),

  otherVehicleMake: getValue(data, [
    "otherVehicleMake",
  ]),

  otherVehicleModel: getValue(data, [
    "otherVehicleModel",
  ]),

  otherVehiclePlate: getValue(data, [
    "otherVehiclePlate",
    "otherDriverPlate",
  ]),

  otherInsuranceCompany: getValue(data, [
    "otherInsuranceCompany",
    "otherPartyInsurance",
  ]),

  otherPolicyNumber: getValue(data, [
    "otherPolicyNumber",
    "otherPartyPolicyNumber",
  ]),

  injuries: getValue(data, [
    "injuries",
    "injury",
    "injuryDescription",
  ]),

  policeContacted: getValue(data, [
    "policeContacted",
    "policeReportFiled",
  ]),

  policeReportNumber: getValue(data, [
    "policeReportNumber",
    "policeReportNo",
  ]),

  emergencyServices: getValue(data, [
    "emergencyServices",
  ]),

  witnessInformation: getValue(data, [
    "witnessInformation",
    "witnesses",
  ]),
});

const incidentTypes = [
  ["collision", "Vehicle collision"],
  ["animal_collision", "Animal collision"],
  ["theft", "Theft"],
  ["weather", "Weather-related damage"],
  ["vandalism", "Vandalism"],
  ["other", "Other"],
];

const yesNo = [
  ["yes", "Yes"],
  ["no", "No"],
];

function MagicClaimForm({
  extractedData = {},
  description = "",
  onSubmit,
}) {
  const initialValues = useMemo(
    () => initialForm(extractedData),
    [extractedData]
  );

  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: "",
      }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    const requiredFields = [
      ["policyholderName", "Policyholder name"],
      ["policyNumber", "Policy number"],
      ["incidentType", "Incident type"],
      ["incidentDate", "Incident date"],
      ["incidentLocation", "Incident location"],
      ["incidentDescription", "Incident description"],
      ["vehicleMake", "Vehicle make"],
      ["vehicleModel", "Vehicle model"],
      ["vehicleYear", "Vehicle year"],
      ["vehiclePlate", "Vehicle registration / plate"],
      ["damagedAreas", "Damaged areas"],
    ];

    requiredFields.forEach(([field, label]) => {
      if (!String(form[field] ?? "").trim()) {
        nextErrors[field] = `${label} is required`;
      }
    });

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      const firstError = Object.keys(errors)[0];

      if (firstError) {
        document
          .getElementById(`magic-${firstError}`)
          ?.focus();
      }

      return;
    }

    onSubmit?.(form);
  };

  const fieldClass = (field) =>
    errors[field] ? "magic-field has-error" : "magic-field";

  return (
    <form className="magic-claim-form" onSubmit={handleSubmit}>
      <div className="magic-document-head">
        <div>
          <span className="magic-document-kicker">
            FORMA AI
          </span>

          <h2>Auto Insurance Claim</h2>

          <p>
            Complete the claim information below. Fields identified
            from your description have been prefilled where possible.
          </p>
        </div>

        <div className="magic-document-meta">
          <span>CLAIM INTAKE</span>
          <strong>NEW CLAIM</strong>
        </div>
      </div>

      {description && (
        <div className="magic-story">
          <div className="magic-story-label">
            YOUR DESCRIPTION
          </div>

          <p>“{description}”</p>

          <span>
            Information is extracted only from the description you
            provided.
          </span>
        </div>
      )}

      <section className="magic-section">
        <div className="magic-section-heading">
          <div className="magic-section-number">01</div>
          <div>
            <h3>Policyholder & Policy</h3>
            <p>Identify the person and policy associated with this claim.</p>
          </div>
        </div>

        <div className="magic-grid">
          <Field
            id="magic-policyholderName"
            label="Policyholder full name"
            required
            value={form.policyholderName}
            onChange={(value) =>
              updateField("policyholderName", value)
            }
            error={errors.policyholderName}
          />

          <Field
            id="magic-policyNumber"
            label="Policy number"
            required
            value={form.policyNumber}
            onChange={(value) =>
              updateField("policyNumber", value)
            }
            error={errors.policyNumber}
          />

          <Field
            id="magic-phone"
            label="Phone number"
            value={form.phone}
            onChange={(value) => updateField("phone", value)}
          />

          <Field
            id="magic-email"
            label="Email address"
            type="email"
            value={form.email}
            onChange={(value) => updateField("email", value)}
          />

          <Field
            id="magic-address"
            label="Policyholder address"
            wide
            value={form.address}
            onChange={(value) =>
              updateField("address", value)
            }
          />
        </div>
      </section>

      <section className="magic-section">
        <div className="magic-section-heading">
          <div className="magic-section-number">02</div>
          <div>
            <h3>Incident Details</h3>
            <p>Tell us when, where and how the incident occurred.</p>
          </div>
        </div>

        <div className="magic-grid">
          <SelectField
            id="magic-incidentType"
            label="Incident type"
            required
            value={form.incidentType}
            options={incidentTypes}
            onChange={(value) =>
              updateField("incidentType", value)
            }
            error={errors.incidentType}
          />

          <Field
            id="magic-incidentDate"
            label="Date of incident"
            required
            type="date"
            value={form.incidentDate}
            onChange={(value) =>
              updateField("incidentDate", value)
            }
            error={errors.incidentDate}
          />

          <Field
            id="magic-incidentTime"
            label="Approximate time"
            type="time"
            value={form.incidentTime}
            onChange={(value) =>
              updateField("incidentTime", value)
            }
          />

          <Field
            id="magic-incidentLocation"
            label="Incident location"
            required
            value={form.incidentLocation}
            onChange={(value) =>
              updateField("incidentLocation", value)
            }
            error={errors.incidentLocation}
          />

          <TextArea
            id="magic-incidentDescription"
            label="What happened?"
            required
            wide
            value={form.incidentDescription}
            onChange={(value) =>
              updateField("incidentDescription", value)
            }
            error={errors.incidentDescription}
          />

          <Field
            id="magic-weatherConditions"
            label="Weather / road conditions"
            wide
            value={form.weatherConditions}
            onChange={(value) =>
              updateField("weatherConditions", value)
            }
          />
        </div>
      </section>

      <section className="magic-section">
        <div className="magic-section-heading">
          <div className="magic-section-number">03</div>
          <div>
            <h3>Your Vehicle</h3>
            <p>Provide the details of the vehicle involved in the claim.</p>
          </div>
        </div>

        <div className="magic-grid">
          <Field
            id="magic-vehicleMake"
            label="Make"
            required
            value={form.vehicleMake}
            onChange={(value) =>
              updateField("vehicleMake", value)
            }
            error={errors.vehicleMake}
          />

          <Field
            id="magic-vehicleModel"
            label="Model"
            required
            value={form.vehicleModel}
            onChange={(value) =>
              updateField("vehicleModel", value)
            }
            error={errors.vehicleModel}
          />

          <Field
            id="magic-vehicleYear"
            label="Year"
            required
            type="number"
            value={form.vehicleYear}
            onChange={(value) =>
              updateField("vehicleYear", value)
            }
            error={errors.vehicleYear}
          />

          <Field
            id="magic-vehiclePlate"
            label="Registration / plate number"
            required
            value={form.vehiclePlate}
            onChange={(value) =>
              updateField("vehiclePlate", value)
            }
            error={errors.vehiclePlate}
          />

          <SelectField
            id="magic-vehicleStatus"
            label="Vehicle condition"
            value={form.vehicleStatus}
            options={[
              ["drivable", "Vehicle is drivable"],
              ["not_drivable", "Vehicle is not drivable"],
              ["towed", "Vehicle was towed"],
            ]}
            onChange={(value) =>
              updateField("vehicleStatus", value)
            }
          />
        </div>
      </section>

      <section className="magic-section">
        <div className="magic-section-heading">
          <div className="magic-section-number">04</div>
          <div>
            <h3>Damage Information</h3>
            <p>Describe the damage caused by the incident.</p>
          </div>
        </div>

        <div className="magic-grid">
          <Field
            id="magic-damagedAreas"
            label="Damaged areas"
            required
            placeholder="e.g. Front windshield, hood"
            value={form.damagedAreas}
            onChange={(value) =>
              updateField("damagedAreas", value)
            }
            error={errors.damagedAreas}
          />

          <Field
            id="magic-estimatedDamage"
            label="Estimated repair cost"
            prefix="$"
            type="number"
            value={form.estimatedDamage}
            onChange={(value) =>
              updateField("estimatedDamage", value)
            }
          />

          <TextArea
            id="magic-damageDescription"
            label="Damage description"
            wide
            value={form.damageDescription}
            onChange={(value) =>
              updateField("damageDescription", value)
            }
          />
        </div>
      </section>

      <section className="magic-section">
        <div className="magic-section-heading">
          <div className="magic-section-number">05</div>
          <div>
            <h3>Other Party</h3>
            <p>Complete this section if another person or vehicle was involved.</p>
          </div>
        </div>

        <div className="magic-grid">
          <SelectField
            id="magic-otherPartyInvolved"
            label="Was another party involved?"
            value={form.otherPartyInvolved}
            options={yesNo}
            onChange={(value) =>
              updateField("otherPartyInvolved", value)
            }
          />

          {form.otherPartyInvolved === "yes" && (
            <>
              <Field
                id="magic-otherPartyName"
                label="Other party name"
                value={form.otherPartyName}
                onChange={(value) =>
                  updateField("otherPartyName", value)
                }
              />

              <Field
                id="magic-otherPartyPhone"
                label="Other party phone"
                value={form.otherPartyPhone}
                onChange={(value) =>
                  updateField("otherPartyPhone", value)
                }
              />

              <Field
                id="magic-otherVehicleMake"
                label="Other vehicle make"
                value={form.otherVehicleMake}
                onChange={(value) =>
                  updateField("otherVehicleMake", value)
                }
              />

              <Field
                id="magic-otherVehicleModel"
                label="Other vehicle model"
                value={form.otherVehicleModel}
                onChange={(value) =>
                  updateField("otherVehicleModel", value)
                }
              />

              <Field
                id="magic-otherVehiclePlate"
                label="Other vehicle plate"
                value={form.otherVehiclePlate}
                onChange={(value) =>
                  updateField("otherVehiclePlate", value)
                }
              />

              <Field
                id="magic-otherInsuranceCompany"
                label="Other insurance company"
                value={form.otherInsuranceCompany}
                onChange={(value) =>
                  updateField("otherInsuranceCompany", value)
                }
              />

              <Field
                id="magic-otherPolicyNumber"
                label="Other policy number"
                value={form.otherPolicyNumber}
                onChange={(value) =>
                  updateField("otherPolicyNumber", value)
                }
              />
            </>
          )}
        </div>
      </section>

      <section className="magic-section">
        <div className="magic-section-heading">
          <div className="magic-section-number">06</div>
          <div>
            <h3>Police, Injuries & Witnesses</h3>
            <p>Provide any emergency, police or witness information.</p>
          </div>
        </div>

        <div className="magic-grid">
          <SelectField
            id="magic-policeContacted"
            label="Was police contacted?"
            value={form.policeContacted}
            options={yesNo}
            onChange={(value) =>
              updateField("policeContacted", value)
            }
          />

          <Field
            id="magic-policeReportNumber"
            label="Police report number"
            value={form.policeReportNumber}
            onChange={(value) =>
              updateField("policeReportNumber", value)
            }
          />

          <SelectField
            id="magic-emergencyServices"
            label="Emergency services involved?"
            value={form.emergencyServices}
            options={yesNo}
            onChange={(value) =>
              updateField("emergencyServices", value)
            }
          />

          <TextArea
            id="magic-injuries"
            label="Injuries / medical information"
            value={form.injuries}
            onChange={(value) =>
              updateField("injuries", value)
            }
          />

          <TextArea
            id="magic-witnessInformation"
            label="Witness information"
            wide
            value={form.witnessInformation}
            onChange={(value) =>
              updateField("witnessInformation", value)
            }
          />
        </div>
      </section>

      <section className="magic-evidence">
        <div>
          <span className="magic-evidence-icon">+</span>

          <div>
            <h3>Supporting evidence</h3>
            <p>
              Photos, police reports and other supporting documents
              can be added to the claim.
            </p>
          </div>
        </div>

        <span className="magic-evidence-status">
          DOCUMENTS — NEXT STEP
        </span>
      </section>

      <div className="magic-form-footer">
        <div>
          <strong>Review before continuing</strong>
          <p>
            You can edit every detail before the claim document is
            generated.
          </p>
        </div>

        <button type="submit" className="magic-review-button">
          Review claim
          <span>→</span>
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  required = false,
  wide = false,
  error,
  placeholder = "",
  prefix,
}) {
  return (
    <div className={`magic-field-wrap ${wide ? "wide" : ""}`}>
      <label htmlFor={id}>
        {label}
        {required && <span>*</span>}
      </label>

      <div className={error ? "magic-input-shell error" : "magic-input-shell"}>
        {prefix && <span className="magic-prefix">{prefix}</span>}

        <input
          id={id}
          type={type}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>

      {error && <small className="magic-error">{error}</small>}
    </div>
  );
}

function TextArea({
  id,
  label,
  value,
  onChange,
  required = false,
  wide = false,
  error,
}) {
  return (
    <div className={`magic-field-wrap ${wide ? "wide" : ""}`}>
      <label htmlFor={id}>
        {label}
        {required && <span>*</span>}
      </label>

      <textarea
        id={id}
        value={value ?? ""}
        rows={4}
        onChange={(event) => onChange(event.target.value)}
      />

      {error && <small className="magic-error">{error}</small>}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  options,
  onChange,
  required = false,
  error,
}) {
  return (
    <div className="magic-field-wrap">
      <label htmlFor={id}>
        {label}
        {required && <span>*</span>}
      </label>

      <select
        id={id}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Select an option</option>

        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>

      {error && <small className="magic-error">{error}</small>}
    </div>
  );
}

export default MagicClaimForm;