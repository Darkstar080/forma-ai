import { Router } from "express";
import FormSubmission from "../models/FormSubmission.js";
import { requireAuth } from "../middleware/requireAuth.js";
import PDFDocument from "pdfkit";
import FormSchemaDefinition from "../models/FormSchema.js";

const router = Router();

router.use(requireAuth); // every route below needs a valid token

router.get("/:id/pdf", async (req, res) => {
  try {
    const submission = await FormSubmission.findById(req.params.id);
    if (!submission) return res.status(404).json({ error: "Submission not found" });
    if (!submission.userId || submission.userId.toString() !== req.userId) {
      return res.status(403).json({ error: "You don't have access to this submission" });
    }

    const schema = await FormSchemaDefinition.findOne({ formId: submission.formId });
    const fields = schema ? schema.fields : Object.keys(submission.data).map((k) => ({ fieldId: k, label: k }));

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${submission.formId}-${submission._id}.pdf"`);

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    doc.fontSize(20).fillColor("#1c1c19").text(schema?.title || submission.formId);
    doc.moveDown(0.3);
    doc.fontSize(10).fillColor("#6f706b");
    doc.text(`Reference: ${submission._id}`);
    doc.text(`Status: ${submission.status}`);
    doc.text(`Last updated: ${new Date(submission.updatedAt).toLocaleString()}`);
    doc.moveDown(1);

    fields.forEach((field) => {
      const value = submission.data[field.fieldId];
      if (value === undefined || value === null || value === "") return;
      doc.fontSize(10).fillColor("#6f706b").text(field.label || field.fieldId);
      doc.fontSize(13).fillColor("#1c1c19").text(String(value));
      doc.moveDown(0.6);
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ error: "Failed to generate PDF" });
  }
});

// GET /api/submissions — list the logged-in user's own submissions
router.get("/", async (req, res) => {
  try {
    const submissions = await FormSubmission.find({ userId: req.userId }).sort({ updatedAt: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: "Failed to list submissions" });
  }
});

router.post("/", async (req, res) => {
  const { formId, data, status } = req.body;
  if (!formId) return res.status(400).json({ error: "formId is required" });
  try {
    const submission = await FormSubmission.create({
      formId,
      userId: req.userId,
      data: data || {},
      status: status === "submitted" ? "submitted" : "draft",
    });
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ error: "Failed to save submission" });
  }
});

router.put("/:id", async (req, res) => {
  const { data, status } = req.body;
  try {
    const submission = await FormSubmission.findById(req.params.id);
    if (!submission) return res.status(404).json({ error: "Submission not found" });
    if (!submission.userId || submission.userId.toString() !== req.userId) {
      return res.status(403).json({ error: "You don't have access to this submission" });
    }
    submission.data = data;
    submission.status = status === "submitted" ? "submitted" : "draft";
    await submission.save();
    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: "Failed to update submission" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const submission = await FormSubmission.findById(req.params.id);
    if (!submission) return res.status(404).json({ error: "Submission not found" });
    if (!submission.userId || submission.userId.toString() !== req.userId) {
      return res.status(403).json({ error: "You don't have access to this submission" });
    }
    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch submission" });
  }
});

export default router;