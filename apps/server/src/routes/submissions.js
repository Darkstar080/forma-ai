import { Router } from "express";
import FormSubmission from "../models/FormSubmission.js";

const router = Router();

// POST /api/submissions — save a new draft (or a final submit)
router.post("/", async (req, res) => {
  const { formId, data, status } = req.body;
  if (!formId) return res.status(400).json({ error: "formId is required" });
  try {
    const submission = await FormSubmission.create({
      formId,
      data: data || {},
      status: status === "submitted" ? "submitted" : "draft",
    });
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ error: "Failed to save submission" });
  }
});

// PUT /api/submissions/:id — update an existing draft
router.put("/:id", async (req, res) => {
  const { data, status } = req.body;
  try {
    const submission = await FormSubmission.findByIdAndUpdate(
      req.params.id,
      { data, status: status === "submitted" ? "submitted" : "draft" },
      { new: true }
    );
    if (!submission) return res.status(404).json({ error: "Submission not found" });
    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: "Failed to update submission" });
  }
});

// GET /api/submissions/:id — resume a draft
router.get("/:id", async (req, res) => {
  try {
    const submission = await FormSubmission.findById(req.params.id);
    if (!submission) return res.status(404).json({ error: "Submission not found" });
    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch submission" });
  }
});

export default router;
