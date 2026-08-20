import mongoose from "mongoose";
import dotenv from "dotenv";
import FormSchemaDefinition from "./models/FormSchema.js";

dotenv.config();

const exampleForm = {
  formId: "auto_insurance_claim_v1",
  title: "Auto Insurance Claim",
  fields: [
    { fieldId: "incidentType", label: "What happened?", type: "select",
      options: [{ label: "Animal collision", value: "animal_collision" }, { label: "Other vehicle", value: "other_vehicle" }],
      validation: { required: true }, showIf: [] },
    { fieldId: "animalType", label: "What animal?", type: "text",
      validation: { required: true },
      showIf: [{ field: "incidentType", operator: "equals", value: "animal_collision" }] },
    { fieldId: "deerCollisionSpeed", label: "Approx. speed on impact (mph)?", type: "number",
      validation: { required: true, min: 0, max: 200 },
      showIf: [
        { field: "incidentType", operator: "equals", value: "animal_collision" },
        { field: "animalType", operator: "equals", value: "deer" },
      ] },
  ],
};

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await FormSchemaDefinition.deleteOne({ formId: exampleForm.formId });
  await FormSchemaDefinition.create(exampleForm);
  console.log("Seeded:", exampleForm.formId);
  await mongoose.disconnect();
}

seed();