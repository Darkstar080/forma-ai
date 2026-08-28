import { useEffect, useState } from "react";

function FormPicker({ selectedFormId, onSelect }) {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/schemas")
      .then((res) => res.json())
      .then(setForms)
      .catch(() => setForms([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading form types...</p>;

  return (
    <div className="form-picker">
      <label htmlFor="form-picker-select">Form type</label>
      <select
        id="form-picker-select"
        value={selectedFormId || ""}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="" disabled>Select a form...</option>
        {forms.map((f) => (
          <option key={f.formId} value={f.formId}>{f.title}</option>
        ))}
      </select>
    </div>
  );
}

export default FormPicker;