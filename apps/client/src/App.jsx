import { useState } from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";
import Home from "./components/Home";
import FormPicker from "./components/FormPicker";
import DynamicFormRenderer from "./components/DynamicFormRenderer/DynamicFormRenderer";
import AuthPage from "./components/Auth/AuthPage";
import MyClaims from "./components/MyClaims";

function ClaimPage() {
  const [searchParams] = useSearchParams();
  const [formId, setFormId] = useState(searchParams.get("formId") || "auto_insurance_claim_v1");
  const resumeId = searchParams.get("resume");

  return (
    <div style={{ padding: "2rem" }}>
      <FormPicker selectedFormId={formId} onSelect={setFormId} />
      {formId && (
        <DynamicFormRenderer
          formId={formId}
          description="Provide the details below to help us understand your claim."
          resumeId={resumeId}
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
      <Route path="/login" element={<AuthPage />} />
      <Route path="/my-claims" element={<MyClaims />} />
    </Routes>
  );
}

export default App;