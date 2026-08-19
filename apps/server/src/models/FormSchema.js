import mongoose from "mongoose";

const ConditionSchema = new mongoose.Schema(
  {
    field: { type: String, required: true },     // fieldId this condition checks
    operator: {
      type: String,
      enum: ["equals", "not_equals", "in", "greater_than", "less_than", "exists"],
      required: true,
    },
    value: mongoose.Schema.Types.Mixed,           // comparison value; unused for "exists"
  },
  { _id: false }
);

const FieldSchema = new mongoose.Schema(
  {
    fieldId: { type: String, required: true },     // e.g. "incidentType"
    label: { type: String, required: true },        // e.g. "What type of incident?"
    type: {
      type: String,
      enum: ["text", "textarea", "number", "date", "select", "checkbox", "radio"],
      required: true,
    },
    options: [{ label: String, value: String }],    // for select/checkbox/radio
    validation: {
      required: { type: Boolean, default: false },
      regex: { type: String },                        // stored as string, compiled at runtime
      min: Number,
      max: Number,
    },
    // ALL conditions must pass (AND logic) for this field to render.
    // Empty array = always shown.
    showIf: [ConditionSchema],
  },
  { _id: false }
);

const FormSchemaDefinition = new mongoose.Schema(
  {
    formId: { type: String, required: true, unique: true },  // e.g. "auto_insurance_claim_v1"
    title: { type: String, required: true },
    version: { type: Number, default: 1 },
    fields: [FieldSchema],
  },
  { timestamps: true }
);

export default mongoose.model("FormSchemaDefinition", FormSchemaDefinition);