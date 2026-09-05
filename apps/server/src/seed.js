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

    { fieldId: "otherVehicleMake", label: "Other driver vehicle make/model", type: "text",
      validation: { required: true },
      showIf: [{ field: "incidentType", operator: "equals", value: "other_vehicle" }] },

    { fieldId: "otherVehiclePlate", label: "Other driver license plate (if known)", type: "text",
      validation: {},
      showIf: [{ field: "incidentType", operator: "equals", value: "other_vehicle" }] },

    { fieldId: "policeReportFiled", label: "Was a police report filed?", type: "radio",
      options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }],
      validation: { required: true },
      showIf: [{ field: "incidentType", operator: "equals", value: "other_vehicle" }] },

    { fieldId: "policeReportNumber", label: "Police report number", type: "text",
      validation: { required: true },
      showIf: [
        { field: "incidentType", operator: "equals", value: "other_vehicle" },
        { field: "policeReportFiled", operator: "equals", value: "yes" },
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