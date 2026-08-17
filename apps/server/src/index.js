import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// TODO Week 1: mount /api/schemas routes (MongoDB-backed form schema CRUD)
// TODO Week 2: mount /api/extract route (LangChain LLM extraction)
// TODO Week 4: mount /api/forms/:id/save routes (save & resume)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
