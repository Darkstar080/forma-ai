import { Router } from "express";
import FormSchemaDefinition from "../models/FormSchema.js";

const router = Router();

// GET /api/schemas/:formId
router.get("/:formId", async (req, res) => {
  try {
    const schema = await FormSchemaDefinition.findOne({ formId: req.params.formId });
    if (!schema) {
      return res.status(404).json({ error: "Schema not found" });
    }
    res.json(schema);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch schema" });
  }
});

export default router;