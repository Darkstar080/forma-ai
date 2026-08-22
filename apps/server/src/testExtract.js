import dotenv from "dotenv";
import mongoose from "mongoose";
import FormSchemaDefinition from "./models/FormSchema.js";
import { extractFromText } from "./services/extraction.js";

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const schema = await FormSchemaDefinition.findOne({ formId: "auto_insurance_claim_v1" });
  const result = await extractFromText(
    schema,
    "I hit a deer on I-95 yesterday going about 50 mph, and the windshield shattered."
  );
  console.log(JSON.stringify(result, null, 2));
  await mongoose.disconnect();
}

run();