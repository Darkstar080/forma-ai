import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import FormPicker from "./components/FormPicker";
import DynamicFormRenderer from "./components/DynamicFormRenderer/DynamicFormRenderer";

function ClaimPage() {
  const [formId, setFormId] = useState("auto_insurance_claim_v1");

  return (
    <div style={{ padding: "2rem" }}>
      <FormPicker selectedFormId={formId} onSelect={setFormId} />
      {formId && (
        <DynamicFormRenderer
          formId={formId}
          description="Provide the details below to help us understand your claim."
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/claim" element={<ClaimPage />} />
    </Routes>
  );
}

export default App;