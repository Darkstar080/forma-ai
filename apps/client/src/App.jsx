import Home from "./components/Home";
import DynamicFormRenderer from "./components/DynamicFormRenderer/DynamicFormRenderer";

function App() {
  return (
    <Home>
      <div className="existing-form-wrapper">
        <DynamicFormRenderer
          formId="auto_insurance_claim_v1"
          description="Provide the details below to help us understand your claim."
        />
      </div>
    </Home>
  );
}

export default App;