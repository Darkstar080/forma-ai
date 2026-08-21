import { useForm } from "react-hook-form";
import { evaluateConditions } from "@forma-ai/shared";
import { useFormSchema } from "../../hooks/useFormSchema";
import "./DynamicFormRenderer.css";

function DynamicFormRenderer({ formId, description }) {
  const { schema, loading, error } = useFormSchema(formId);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const values = watch();

  if (loading) return <p>Loading form...</p>;
  if (error) return <p>Failed to load form: {error}</p>;
  if (!schema) return null;

  const visibleFields = schema.fields.filter((field) =>
    evaluateConditions(field.showIf, values)
  );

  const onSubmit = (data) => console.log("Form submitted:", data); // TODO Week 3/4: POST to save

  const renderField = (field) => {
    const rules = { required: field.validation?.required ? "This field is required" : false };
    if (field.validation?.regex) {
      rules.pattern = { value: new RegExp(field.validation.regex), message: "Invalid format" };
    }
    if (field.validation?.min !== undefined) rules.min = { value: field.validation.min, message: `Minimum is ${field.validation.min}` };
    if (field.validation?.max !== undefined) rules.max = { value: field.validation.max, message: `Maximum is ${field.validation.max}` };

    switch (field.type) {
      case "select":
        return (
          <select {...register(field.fieldId, rules)} defaultValue="">
            <option value="" disabled>Select an option</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );
      case "textarea":
        return <textarea {...register(field.fieldId, rules)} rows={5} />;
      case "number":
        return <input type="number" {...register(field.fieldId, { ...rules, valueAsNumber: true })} />;
      case "date":
        return <input type="date" {...register(field.fieldId, rules)} />;
      case "checkbox":
        return <input type="checkbox" {...register(field.fieldId, rules)} />;
      case "radio":
        return (
          <div>
            {field.options?.map((opt) => (
              <label key={opt.value} style={{ display: "block", fontWeight: 400 }}>
                <input type="radio" value={opt.value} {...register(field.fieldId, rules)} /> {opt.label}
              </label>
            ))}
          </div>
        );
      default:
        return <input type="text" {...register(field.fieldId, rules)} />;
    }
  };

  return (
    <div className="dynamic-form">
      <div className="form-header">
        <div className="form-badge">INSURANCE CLAIM</div>
        <h2>{schema.title}</h2>
        {description && <p>{description}</p>}
      </div>

      <div className="form-divider" />

      <form onSubmit={handleSubmit(onSubmit)}>
        {visibleFields.map((field) => (
          <div className="form-field" key={field.fieldId}>
            <label htmlFor={field.fieldId}>
              {field.label}
              {field.validation?.required && <span className="required"> *</span>}
            </label>
            {renderField(field)}
            {errors[field.fieldId] && (
              <span className="field-error">{errors[field.fieldId].message}</span>
            )}
          </div>
        ))}

        <div className="form-footer">
          <p className="required-note"><span>*</span> Required fields</p>
          <div className="form-actions">
            <button type="button" className="draft-button">Save as Draft</button>
            <button type="submit" className="submit-button">Submit Claim</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DynamicFormRenderer;