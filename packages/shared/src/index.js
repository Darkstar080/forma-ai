// Shared contract between server (LLM extraction output + schema shape)
// and client (React Hook Form field mapping).
// Keeping this in one place avoids the two sides drifting apart.

// TODO Week 1: define the form field schema shape (type, validation, showIf)
// export const FieldSchema = { ... }

// TODO Week 2: define the LLM extraction output shape
// export const ExtractionResult = { ... }

export const SCHEMA_VERSION = "0.1.0";
