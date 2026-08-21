import { useState } from "react";
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
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [draftSaved, setDraftSaved] = useState(false);

  const handleChange = (fieldName, value) => {
    setFormData((previous) => ({
      ...previous,
      [fieldName]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [fieldName]: "",
    }));

    setDraftSaved(false);
  };

  const validateForm = () => {
    const validationErrors = {};

    formSchema.fields.forEach((field) => {
      if (
        field.required &&
        !String(formData[field.name] || "").trim()
      ) {
        validationErrors[field.name] = `${field.label} is required.`;
      }
    });

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log("Insurance Claim:", formData);
  };

  const handleSaveDraft = () => {
    localStorage.setItem(
      "forma-ai-claim-draft",
      JSON.stringify(formData)
    );

    setDraftSaved(true);
  };

  const renderField = (field) => {
    const hasError = Boolean(errors[field.name]);

    const commonProps = {
      id: field.name,
      name: field.name,
      required: field.required,
      value: formData[field.name] || "",
      onChange: (event) =>
        handleChange(field.name, event.target.value),
      "aria-invalid": hasError,
      "aria-describedby": hasError
        ? `${field.name}-error`
        : undefined,
    };

    switch (field.type) {
      case "text":
        return (
          <input
            {...commonProps}
            type="text"
            placeholder={field.placeholder}
          />
        );

      case "date":
        return <input {...commonProps} type="date" />;

      case "textarea":
        return (
          <textarea
            {...commonProps}
            placeholder={field.placeholder}
            rows={5}
          />
        );

      case "select":
        return (
          <select {...commonProps}>
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

      <form onSubmit={handleSubmit} noValidate>
        {formSchema.fields.map((field) => (
          <div
            className={`form-field ${
              errors[field.name] ? "field-error" : ""
            }`}
            key={field.name}
          >
            <label htmlFor={field.name}>
              {field.label}

              {field.required && (
                <span className="required"> *</span>
              )}
            </label>

            {renderField(field)}

            {errors[field.name] && (
              <p
                id={`${field.name}-error`}
                className="error-message"
              >
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}

        <div className="form-footer">
          <div>
            <p className="required-note">
              <span>*</span> Required fields
            </p>

            {draftSaved && (
              <p className="draft-message">
                Draft saved successfully.
              </p>
            )}
          </div>

          <div className="form-actions">
            <button
  type="button"
  className="draft-button"
  onClick={handleSaveDraft}
>
  Save & Continue
</button>

<button type="submit" className="submit-button">
  Continue
</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DynamicFormRenderer;