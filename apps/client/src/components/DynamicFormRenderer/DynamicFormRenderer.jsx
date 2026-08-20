import "./DynamicFormRenderer.css";

const formSchema = {
  title: "Insurance Claim",
  description:
    "Provide the details below to help us understand your claim.",
  fields: [
    {
      name: "incidentType",
      label: "Incident Type",
      type: "select",
      required: true,
      options: [
        "Accident",
        "Animal Collision",
        "Theft",
        "Weather Damage",
      ],
    },
    {
      name: "vehicle",
      label: "Vehicle",
      type: "text",
      required: true,
      placeholder: "e.g. Honda Civic",
    },
    {
      name: "incidentDate",
      label: "Incident Date",
      type: "date",
      required: true,
    },
    {
      name: "description",
      label: "Damage Description",
      type: "textarea",
      required: true,
      placeholder:
        "Briefly describe what happened and the damage caused...",
    },
  ],
};

function DynamicFormRenderer() {
  const renderField = (field) => {
    switch (field.type) {
      case "text":
        return (
          <input
            id={field.name}
            type="text"
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
          />
        );

      case "date":
        return (
          <input
            id={field.name}
            type="date"
            name={field.name}
            required={field.required}
          />
        );

      case "textarea":
        return (
          <textarea
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            rows={5}
          />
        );

      case "select":
        return (
          <select
            id={field.name}
            name={field.name}
            required={field.required}
            defaultValue=""
          >
            <option value="" disabled>
              Select an option
            </option>

            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dynamic-form">
      <div className="form-header">
        <div className="form-badge">INSURANCE CLAIM</div>

        <h2>{formSchema.title}</h2>

        <p>{formSchema.description}</p>
      </div>

      <div className="form-divider" />

      <div className="form-section">
        <h3>Incident Information</h3>
        <p className="section-description">
          Tell us about the incident and the damage involved.
        </p>
      </div>

      <form>
        {formSchema.fields.map((field) => (
          <div className="form-field" key={field.name}>
            <label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="required"> *</span>}
            </label>

            {renderField(field)}
          </div>
        ))}

        <div className="form-footer">
            <p className="required-note">
              <span>*</span> Required fields
            </p>

            <div className="form-actions">
              <button type="button" className="draft-button">
                Save as Draft
              </button>

              <button type="submit" className="submit-button">
                Submit Claim
              </button>
            </div>
          </div>
      </form>
    </div>
  );
}

export default DynamicFormRenderer;