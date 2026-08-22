import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

function buildResponseSchema(fields) {
  const properties = {};
  for (const field of fields) {
    const prop = {
      type: field.type === "number" ? "number" : "string",
      description: field.label,
      nullable: true,
    };
    if ((field.type === "select" || field.type === "radio") && field.options?.length) {
      prop.enum = field.options.map((o) => o.value);
    }
    properties[field.fieldId] = prop;
  }
  return { type: "object", properties };
}

export async function extractFromText(schema, text) {
  const responseSchema = buildResponseSchema(schema.fields);
  const model = new ChatGoogleGenerativeAI({ model: "gemini-3.6-flash", temperature: 0 });
  const structuredModel = model.withStructuredOutput(responseSchema);

  const fieldDescriptions = schema.fields
    .map((f) => {
      const opts = f.options?.length ? ` [allowed values: ${f.options.map((o) => o.value).join(", ")}]` : "";
      return `- ${f.fieldId} (${f.type}): ${f.label}${opts}`;
    })
    .join("\n");

  const prompt = `Extract structured data from the user's text for a form titled "${schema.title}".

Only fill a field if the text clearly supports it. Set it to null if it isn't mentioned or you're not confident — never guess.

Fields:
${fieldDescriptions}

User's text:
"""
${text}
"""`;

  const result = await structuredModel.invoke(prompt);

  const extracted = {};
  const missing = [];
  for (const field of schema.fields) {
    const value = result[field.fieldId];
    if (value === null || value === undefined || value === "") {
      missing.push(field.fieldId);
    } else {
      extracted[field.fieldId] = value;
    }
  }

  return { extracted, missing };
}