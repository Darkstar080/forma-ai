import "./DynamicFormRenderer.css";

const formSchema = {
  title: "Insurance Claim",
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
      placeholder: "Enter vehicle name",
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
      placeholder: "Describe the damage",
    },
  ],
};

function DynamicFormRenderer() {
  const renderField = (field) => {
    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
          />
        );

      case "date":
        return (
          <input
            type="date"
            name={field.name}
            required={field.required}
          />
        );

      case "textarea":
        return (
          <textarea
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
          />
        );

      case "select":
        return (
          <select name={field.name} required={field.required}>
            <option value="">Select an option</option>

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
      <h2>{formSchema.title}</h2>

      <form>
        {formSchema.fields.map((field) => (
          <div className="form-field" key={field.name}>
            <label htmlFor={field.name}>
              {field.label}
              {field.required && <span> *</span>}
            </label>

            {renderField(field)}
          </div>
        ))}

        <button type="submit">Submit Claim</button>
      </form>
    </div>
  );
}

export default DynamicFormRenderer;