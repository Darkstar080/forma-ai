import mongoose from "mongoose";

const FormSubmission = new mongoose.Schema(
  {
    formId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
    status: { type: String, enum: ["draft", "submitted"], default: "draft" },
  },
  { timestamps: true }
);

export default mongoose.model("FormSubmission", FormSubmission);