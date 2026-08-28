import { Router } from "express";
import FormSchemaDefinition from "../models/FormSchema.js";
import { validateSchemaFields } from "../services/schemaValidation.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const schemas = await FormSchemaDefinition.find({}, "formId title version");
    res.json(schemas);
  } catch (err) {
    res.status(500).json({ error: "Failed to list schemas" });
  }
});

router.get("/:formId", async (req, res) => {
  try {
    const schema = await FormSchemaDefinition.findOne({ formId: req.params.formId });
    if (!schema) return res.status(404).json({ error: "Schema not found" });
    res.json(schema);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch schema" });
  }
});

router.post("/", async (req, res) => {
  const { formId, title, fields } = req.body;
  if (!formId || !title || !Array.isArray(fields)) {
    return res.status(400).json({ error: "formId, title, and fields[] are required" });
  }
  const validationErrors = validateSchemaFields(fields);
  if (validationErrors.length) {
    return res.status(400).json({ error: "Invalid schema", details: validationErrors });
  }
  try {
    const existing = await FormSchemaDefinition.findOne({ formId });
    if (existing) {
      return res.status(409).json({ error: `formId "${formId}" already exists — use PUT to update it` });
    }
    const schema = await FormSchemaDefinition.create({ formId, title, fields });
    res.status(201).json(schema);
  } catch (err) {
    res.status(500).json({ error: "Failed to create schema" });
  }
});

router.put("/:formId", async (req, res) => {
  const { title, fields } = req.body;
  if (!title || !Array.isArray(fields)) {
    return res.status(400).json({ error: "title and fields[] are required" });
  }
  const validationErrors = validateSchemaFields(fields);
  if (validationErrors.length) {
    return res.status(400).json({ error: "Invalid schema", details: validationErrors });
  }
  try {
    const schema = await FormSchemaDefinition.findOneAndUpdate(
      { formId: req.params.formId },
      { title, fields, $inc: { version: 1 } },
      { new: true }
    );
    if (!schema) return res.status(404).json({ error: "Schema not found" });
    res.json(schema);
  } catch (err) {
    res.status(500).json({ error: "Failed to update schema" });
  }
});

export default router;