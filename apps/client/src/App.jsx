// TODO Week 1: DynamicFormRenderer component - fetches JSON schema, renders fields
// TODO Week 2: MagicInput component - free-text box + loading state for AI extraction
// TODO Week 3: wire extraction output into React Hook Form fields

import DynamicFormRenderer from "./components/DynamicFormRenderer/DynamicFormRenderer";

function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Forma AI</h1>
      <DynamicFormRenderer />
    </div>
  );
}

export default App;