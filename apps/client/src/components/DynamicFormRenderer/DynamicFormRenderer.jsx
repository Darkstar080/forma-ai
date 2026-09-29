import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { evaluateConditions } from "@forma-ai/shared";
import { authFetch, isLoggedIn } from "../../lib/api";
import { useFormSchema } from "../../hooks/useFormSchema";
import "./DynamicFormRenderer.css";

function cleanVisibleData(schema, data) {
  const visibleFieldIds = schema.fields
    .filter((f) => evaluateConditions(f.showIf, data))
    .map((f) => f.fieldId);

  return Object.fromEntries(
    Object.entries(data).filter(([key]) =>
      visibleFieldIds.includes(key)
    )
  );
}

function DynamicFormRenderer({
  formId,
  description,
  resumeId,
  initialValues = {},
  onSubmit,
  submitLabel = "Submit Claim",
  showDraftButton = true,
}) {
  const { schema, loading, error } = useFormSchema(formId);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const values = watch();

  const [submissionId, setSubmissionId] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [magicText, setMagicText] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [extractError, setExtractError] = useState(null);
  const [aiMissingFields, setAiMissingFields] = useState([]);
  const [aiFilledFields, setAiFilledFields] = useState([]);

  const [showResumeBanner, setShowResumeBanner] = useState(false);
  const [savedDraftId, setSavedDraftId] = useState(null);

  // Explicit resume takes priority over generic banner
  useEffect(() => {
    if (resumeId) return;

    const stored = localStorage.getItem(`forma-draft-${formId}`);

    if (stored) {
      setSavedDraftId(stored);
      setShowResumeBanner(true);
    }
  }, [formId, resumeId]);

  useEffect(() => {
    if (!resumeId) return;

    (async () => {
      try {
        const res = await authFetch(`/api/submissions/${resumeId}`);

        if (!res.ok) return;

        const submission = await res.json();

        reset(submission.data);
        setSubmissionId(submission._id);
      } catch {
        // silent — user can still fill the form manually
      }
    })();
  }, [resumeId, reset]);

  if (loading) return <p>Loading form...</p>;
  if (error) return <p>Failed to load form: {error}</p>;
  if (!schema) return null;

  const visibleFields = schema.fields.filter((field) =>
    evaluateConditions(field.showIf, values)
  );

  const handleMagicExtract = async () => {
    if (!magicText.trim()) return;

    setExtracting(true);
    setExtractError(null);

    try {
      const res = await fetch(`/api/extract/${formId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: magicText,
        }),
      });

      if (res.status === 429) {
        throw new Error(
          "Too many requests right now. Wait a minute and try again."
        );
      }

      if (!res.ok) {
        throw new Error(
          "Could not read your description. Please fill in the form manually."
        );
      }

      const { extracted, missing } = await res.json();

      Object.entries(extracted).forEach(([fieldId, value]) => {
        setValue(fieldId, value, {
          shouldValidate: true,
        });
      });

      setAiFilledFields(Object.keys(extracted));
      setAiMissingFields(missing);
    } catch (err) {
      setExtractError(err.message);
    } finally {
      setExtracting(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!isLoggedIn()) {
      setSaveStatus("needsLogin");
      return;
    }

    setSaveStatus("saving");

    const cleanedData = cleanVisibleData(schema, watch());

    try {
      const method = submissionId ? "PUT" : "POST";

      const url = submissionId
        ? `/api/submissions/${submissionId}`
        : "/api/submissions";

      const res = await authFetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formId,
          data: cleanedData,
          status: "draft",
        }),
      });

      if (!res.ok) throw new Error("Save failed");

      const saved = await res.json();

      setSubmissionId(saved._id);

      localStorage.setItem(
        `forma-draft-${formId}`,
        saved._id
      );

      setSaveStatus("saved");
    } catch {
      setSaveStatus("error");
    }
  };

  const handleResumeDraft = async () => {
    try {
      const res = await authFetch(
        `/api/submissions/${savedDraftId}`
      );

      if (!res.ok) throw new Error("Could not load draft");

      const draft = await res.json();

      if (draft.status === "submitted") {
        localStorage.removeItem(`forma-draft-${formId}`);
        setShowResumeBanner(false);
        return;
      }

      reset(draft.data);
      setSubmissionId(draft._id);
      setShowResumeBanner(false);
    } catch {
      localStorage.removeItem(`forma-draft-${formId}`);
      setShowResumeBanner(false);
    }
  };

  const handleDismissResume = () =>
    setShowResumeBanner(false);

  const handleFormSubmit = async (data) => {
    if (onSubmit) {
      onSubmit(data);
      return;
    }

    if (!isLoggedIn()) {
      setSubmitStatus("needsLogin");
      return;
    }

    setSubmitStatus("submitting");

    const cleanedData = cleanVisibleData(schema, data);

    try {
      const method = submissionId ? "PUT" : "POST";

      const url = submissionId
        ? `/api/submissions/${submissionId}`
        : "/api/submissions";

      const res = await authFetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formId,
          data: cleanedData,
          status: "submitted",
        }),
      });

      if (!res.ok) throw new Error("Submit failed");

      const saved = await res.json();

      setSubmissionId(saved._id);

      localStorage.removeItem(`forma-draft-${formId}`);

      setSubmitStatus("submitted");
    } catch {
      setSubmitStatus("error");
    }
  };

  const renderField = (field) => {
    const rules = {
      required: field.validation?.required
        ? "This field is required"
        : false,
    };

    if (field.validation?.regex) {
      rules.pattern = {
        value: new RegExp(field.validation.regex),
        message: "Invalid format",
      };
    }

    if (field.validation?.min !== undefined) {
      rules.min = {
        value: field.validation.min,
        message: `Minimum is ${field.validation.min}`,
      };
    }

    if (field.validation?.max !== undefined) {
      rules.max = {
        value: field.validation.max,
        message: `Maximum is ${field.validation.max}`,
      };
    }

    switch (field.type) {
      case "select":
        return (
          <select {...register(field.fieldId, rules)}>
            <option value="" disabled>
              Select an option
            </option>

            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case "textarea":
        return (
          <textarea
            {...register(field.fieldId, rules)}
            rows={5}
          />
        );

      case "number":
        return (
          <input
            type="number"
            {...register(field.fieldId, {
              ...rules,
              valueAsNumber: true,
            })}
          />
        );

      case "date":
        return (
          <input
            type="date"
            {...register(field.fieldId, rules)}
          />
        );

      case "checkbox":
        return (
          <input
            type="checkbox"
            {...register(field.fieldId, rules)}
          />
        );

      case "radio":
        return (
          <div>
            {field.options?.map((opt) => (
              <label
                key={opt.value}
                style={{
                  display: "block",
                  fontWeight: 400,
                }}
              >
                <input
                  type="radio"
                  value={opt.value}
                  {...register(field.fieldId, rules)}
                />{" "}
                {opt.label}
              </label>
            ))}
          </div>
        );

      default:
        return (
          <input
            type="text"
            {...register(field.fieldId, rules)}
          />
        );
    }
  };

  return (
    <div className="dynamic-form">
      <div className="form-header">
        <div className="form-badge">INSURANCE CLAIM</div>

        <h2>{schema.title}</h2>

        {description && <p>{description}</p>}
      </div>

      {showResumeBanner && !submissionId && (
        <div className="resume-banner">
          <p>You have a saved draft for this form.</p>

          <div className="resume-banner-actions">
            <button
              type="button"
              onClick={handleResumeDraft}
            >
              Continue draft
            </button>

            <button
              type="button"
              onClick={handleDismissResume}
            >
              Start fresh
            </button>
          </div>
        </div>
      )}

      <div className="magic-input-section">
        <label htmlFor="magic-input">
          Describe what happened
        </label>

        <textarea
          id="magic-input"
          value={magicText}
          onChange={(e) => setMagicText(e.target.value)}
          placeholder="e.g. I hit a deer on I-95 yesterday going about 50 mph..."
          disabled={extracting}
        />

        <button
          type="button"
          className="magic-input-button"
          onClick={handleMagicExtract}
          disabled={extracting || !magicText.trim()}
        >
          {extracting
            ? "Reading your description..."
            : "Fill form automatically"}
        </button>

        {extractError && (
          <span className="field-error">
            {extractError}
          </span>
        )}
      </div>

      {submissionId && (
        <p
          style={{
            fontSize: "13px",
            color: "#64748b",
          }}
        >
          Draft saved. Your reference:{" "}
          <strong>{submissionId}</strong>
        </p>
      )}

      <div className="form-divider" />

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {visibleFields.map((field) => (
          <div
            className="form-field"
            key={field.fieldId}
          >
            <label htmlFor={field.fieldId}>
              {field.label}

              {field.validation?.required && (
                <span className="required"> *</span>
              )}
            </label>

            {renderField(field)}

            {errors[field.fieldId] && (
              <span className="field-error">
                {errors[field.fieldId].message}
              </span>
            )}

            {aiMissingFields.includes(field.fieldId) &&
              !values[field.fieldId] && (
                <span className="ai-flag">
                  AI could not find this in your description.
                  Please fill it in.
                </span>
              )}

            {aiFilledFields.includes(field.fieldId) && (
              <span className="ai-verify-tag">
                Filled by AI — please verify
              </span>
            )}
          </div>
        ))}

        <div className="form-footer">
          <p className="required-note">
            <span>*</span> Required fields
          </p>

          <div className="form-actions">
            {showDraftButton && (
              <button
                type="button"
                className="draft-button"
                onClick={handleSaveDraft}
              >
                {saveStatus === "saving"
                  ? "Saving..."
                  : "Save as Draft"}
              </button>
            )}

            <button
              type="submit"
              className="submit-button"
              disabled={submitStatus === "submitting"}
            >
              {submitStatus === "submitting"
                ? "Submitting..."
                : submitLabel}
            </button>
          </div>
        </div>

        {(saveStatus === "needsLogin" ||
          submitStatus === "needsLogin") && (
          <p className="field-error">
            Please <Link to="/login">log in</Link> to save or
            submit your claim.
          </p>
        )}

        {submitStatus === "submitted" && (
          <p
            style={{
              color: "#16a34a",
              fontWeight: 600,
            }}
          >
            Claim submitted. Reference: {submissionId}
          </p>
        )}

        {submitStatus === "error" && (
          <p className="field-error">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}

export default DynamicFormRenderer;