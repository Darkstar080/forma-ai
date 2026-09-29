import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

function buildResponseSchema(fields) {
  const properties = {};

  for (const field of fields) {
    const prop = {
      type: field.type === "number" ? "number" : "string",
      description: field.label,
      nullable: true,
    };

    if (
      (field.type === "select" || field.type === "radio") &&
      field.options?.length
    ) {
      prop.enum = field.options.map((o) => o.value);
    }

    properties[field.fieldId] = prop;
  }

  return {
    type: "object",
    properties,
  };
}

export async function extractFromText(schema, text) {
  const responseSchema = buildResponseSchema(schema.fields);

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash-lite",
    temperature: 0,
  });

  const structuredModel = model.withStructuredOutput(responseSchema);

  const fieldDescriptions = schema.fields
    .map((f) => {
      const opts = f.options?.length
        ? ` [allowed values: ${f.options.map((o) => o.value).join(", ")}]`
        : "";

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

    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      missing.push(field.fieldId);
    } else {
      extracted[field.fieldId] = value;
    }
  }

  return { extracted, missing };
}

export async function extractMagicClaimFromText(text) {
  const responseSchema = {
    type: "object",
    properties: {
      policyholderName: { type: "string", nullable: true },
      policyNumber: { type: "string", nullable: true },
      phone: { type: "string", nullable: true },
      email: { type: "string", nullable: true },
      address: { type: "string", nullable: true },

      incidentType: { type: "string", nullable: true },
      incidentDate: { type: "string", nullable: true },
      incidentTime: { type: "string", nullable: true },
      incidentLocation: { type: "string", nullable: true },
      incidentDescription: { type: "string", nullable: true },
      weatherConditions: { type: "string", nullable: true },

      vehicleMake: { type: "string", nullable: true },
      vehicleModel: { type: "string", nullable: true },
      vehicleYear: { type: "string", nullable: true },
      vehiclePlate: { type: "string", nullable: true },
      vehicleStatus: { type: "string", nullable: true },

      damagedAreas: { type: "string", nullable: true },
      damageDescription: { type: "string", nullable: true },
      estimatedDamage: { type: "string", nullable: true },

      otherPartyInvolved: { type: "string", nullable: true },
      otherPartyName: { type: "string", nullable: true },
      otherPartyPhone: { type: "string", nullable: true },
      otherVehicleMake: { type: "string", nullable: true },
      otherVehicleModel: { type: "string", nullable: true },
      otherVehiclePlate: { type: "string", nullable: true },
      otherInsuranceCompany: { type: "string", nullable: true },
      otherPolicyNumber: { type: "string", nullable: true },

      injuries: { type: "string", nullable: true },
      policeContacted: { type: "string", nullable: true },
      policeReportNumber: { type: "string", nullable: true },
      emergencyServices: { type: "string", nullable: true },
      witnessInformation: { type: "string", nullable: true },
    },
  };

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash-lite",
    temperature: 0,
  });

  const structuredModel = model.withStructuredOutput(responseSchema);

  const prompt = `
You are extracting information for an insurance claim.

Extract EVERY piece of information that is explicitly present in the user's description.

IMPORTANT RULES:
- Extract as many supported fields as possible.
- Do NOT guess.
- Do NOT invent missing information.
- If information is not explicitly available, return null.
- Preserve names, numbers, registration plates, policy numbers and contact details exactly.
- Identify the incident type when it is clearly described.
- If the description clearly says another vehicle/person was involved, set otherPartyInvolved to "yes".
- If the description clearly says nobody was injured, set injuries to "No".
- If police were contacted, extract policeContacted and the report number if provided.
- Use the actual description to populate incidentDescription.
- Do not omit information simply because it appears inside a longer sentence.

SUPPORTED FIELDS:

Policyholder:
policyholderName, policyNumber, phone, email, address

Incident:
incidentType, incidentDate, incidentTime, incidentLocation,
incidentDescription, weatherConditions

Vehicle:
vehicleMake, vehicleModel, vehicleYear, vehiclePlate, vehicleStatus

Damage:
damagedAreas, damageDescription, estimatedDamage

Other party:
otherPartyInvolved, otherPartyName, otherPartyPhone,
otherVehicleMake, otherVehicleModel, otherVehiclePlate,
otherInsuranceCompany, otherPolicyNumber

Police / injuries:
injuries, policeContacted, policeReportNumber,
emergencyServices, witnessInformation

User description:
"""
${text}
"""
`;

  const result = await structuredModel.invoke(prompt);

  const extracted = {};
  const missing = [];

  for (const [field, value] of Object.entries(result)) {
    if (
      value !== null &&
      value !== undefined &&
      value !== ""
    ) {
      extracted[field] = value;
    } else {
      missing.push(field);
    }
  }

  return { extracted, missing };
}