import { Router } from "express";
import FormSchemaDefinition from "../models/FormSchema.js";
import { extractFromText } from "../services/extraction.js";

const router = Router();

router.post("/:formId", async (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ error: '"text" is required' });
  }

  try {
    const schema = await FormSchemaDefinition.findOne({ formId: req.params.formId });
    if (!schema) return res.status(404).json({ error: "Schema not found" });

    const { extracted, missing } = await extractFromText(schema, text);
    res.json({ extracted, missing });
  } catch (err) {
    console.error("Extraction error:", err);
    res.status(500).json({ error: "Extraction failed" });
  }
});

export default router;