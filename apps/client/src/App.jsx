import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import DynamicFormRenderer from "./components/DynamicFormRenderer/DynamicFormRenderer";

function ClaimPage() {
  return (
    <DynamicFormRenderer
      formId="auto_insurance_claim_v1"
      description="Provide the details below to help us understand your claim."
    />
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