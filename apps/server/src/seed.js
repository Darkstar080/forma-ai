import mongoose from "mongoose";
import dotenv from "dotenv";
import FormSchemaDefinition from "./models/FormSchema.js";

dotenv.config();

const autoInsuranceForm = {
  formId: "auto_insurance_claim_v1",
  title: "Auto Insurance Claim",
  fields: [
    { fieldId: "policyNumber", label: "Policy number", type: "text", validation: { required: true }, showIf: [] },
    { fieldId: "fullName", label: "Full name", type: "text", validation: { required: true }, showIf: [] },
    { fieldId: "contactPhone", label: "Contact phone number", type: "text", validation: { required: true }, showIf: [] },
    { fieldId: "incidentDate", label: "Date of incident", type: "date", validation: { required: true }, showIf: [] },
    { fieldId: "incidentLocation", label: "Location of incident", type: "text", validation: { required: true }, showIf: [] },

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

    { fieldId: "injuriesInvolved", label: "Were there any injuries?", type: "radio",
      options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }],
      validation: { required: true }, showIf: [] },

    { fieldId: "injuryDescription", label: "Please describe the injuries", type: "textarea",
      validation: { required: true },
      showIf: [{ field: "injuriesInvolved", operator: "equals", value: "yes" }] },

    { fieldId: "vehicleDrivable", label: "Is the vehicle currently drivable?", type: "radio",
      options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }],
      validation: { required: true }, showIf: [] },

    { fieldId: "estimatedDamageCost", label: "Estimated damage cost (USD)", type: "number",
      validation: { required: true, min: 0 }, showIf: [] },
  ],
};

const homeInsuranceForm = {
  formId: "home_insurance_claim_v1",
  title: "Home Insurance Claim",
  fields: [
    { fieldId: "policyNumber", label: "Policy number", type: "text", validation: { required: true }, showIf: [] },
    { fieldId: "fullName", label: "Full name", type: "text", validation: { required: true }, showIf: [] },
    { fieldId: "contactPhone", label: "Contact phone number", type: "text", validation: { required: true }, showIf: [] },
    { fieldId: "incidentDate", label: "Date of incident", type: "date", validation: { required: true }, showIf: [] },
    { fieldId: "propertyAddress", label: "Property address", type: "text", validation: { required: true }, showIf: [] },

    { fieldId: "damageType", label: "What was damaged?", type: "select",
      options: [
        { label: "Water damage", value: "water" },
        { label: "Fire damage", value: "fire" },
        { label: "Theft", value: "theft" },
        { label: "Storm damage", value: "storm" },
      ],
      validation: { required: true }, showIf: [] },

    { fieldId: "waterSource", label: "Source of the water", type: "text",
      validation: { required: true },
      showIf: [{ field: "damageType", operator: "equals", value: "water" }] },

    { fieldId: "fireCause", label: "Suspected cause of the fire", type: "text",
      validation: { required: true },
      showIf: [{ field: "damageType", operator: "equals", value: "fire" }] },

    { fieldId: "itemsStolen", label: "List the items that were stolen", type: "textarea",
      validation: { required: true },
      showIf: [{ field: "damageType", operator: "equals", value: "theft" }] },

    { fieldId: "stormType", label: "Type of storm", type: "select",
      options: [
        { label: "Hail", value: "hail" },
        { label: "High wind", value: "wind" },
        { label: "Flood", value: "flood" },
      ],
      validation: { required: true },
      showIf: [{ field: "damageType", operator: "equals", value: "storm" }] },

    { fieldId: "injuriesInvolved", label: "Were there any injuries?", type: "radio",
      options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }],
      validation: { required: true }, showIf: [] },

    { fieldId: "injuryDescription", label: "Please describe the injuries", type: "textarea",
      validation: { required: true },
      showIf: [{ field: "injuriesInvolved", operator: "equals", value: "yes" }] },

    { fieldId: "habitable", label: "Is the home currently habitable?", type: "radio",
      options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }],
      validation: { required: true }, showIf: [] },

    { fieldId: "estimatedDamageCost", label: "Estimated damage cost (USD)", type: "number",
      validation: { required: true, min: 0 }, showIf: [] },
  ],
};

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  for (const form of [autoInsuranceForm, homeInsuranceForm]) {
    await FormSchemaDefinition.deleteOne({ formId: form.formId });
    await FormSchemaDefinition.create(form);
    console.log("Seeded:", form.formId);
  }
  await mongoose.disconnect();
}

seed();