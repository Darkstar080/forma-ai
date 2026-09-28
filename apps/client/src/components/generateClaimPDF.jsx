import jsPDF from "jspdf";

const value = (data, key) => {
  const v = data?.[key];
  return v !== undefined && v !== null && String(v).trim() !== ""
    ? String(v)
    : "Not provided";
};

const addSection = (doc, title, fields, y) => {
  if (y > 255) {
    doc.addPage();
    y = 20;
  }

  doc.setFillColor(245, 247, 246);
  doc.rect(15, y - 5, 180, 9, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(title, 18, y + 1);

  y += 12;

  doc.setFontSize(9);

  fields.forEach(({ label, key, data }) => {
    const fieldValue = value(data, key);
    const text = `${label}: ${fieldValue}`;

    const lines = doc.splitTextToSize(text, 170);

    if (y + lines.length * 5 > 275) {
      doc.addPage();
      y = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, 18, y);

    doc.setFont("helvetica", "normal");

    const labelWidth = doc.getTextWidth(`${label}: `);

    if (lines.length === 1) {
      doc.text(fieldValue, 18 + labelWidth, y);
      y += 6;
    } else {
      doc.text(lines, 18, y + 5);
      y += lines.length * 5 + 5;
    }
  });

  return y + 7;
};

export const generateClaimPDF = (claimData, description) => {
  const doc = new jsPDF();

  const claimNumber = `FORMA-${Date.now()}`;

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("FORMA", 15, 20);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("AI-ASSISTED INSURANCE CLAIM", 15, 27);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(`Claim Reference: ${claimNumber}`, 195, 20, {
    align: "right",
  });

  doc.setFont("helvetica", "normal");
  doc.text(
    `Generated: ${new Date().toLocaleDateString()}`,
    195,
    27,
    { align: "right" }
  );

  doc.line(15, 33, 195, 33);

  let y = 45;

  y = addSection(
    doc,
    "1. POLICYHOLDER & POLICY",
    [
      { label: "Name", key: "policyholderName", data: claimData },
      { label: "Policy Number", key: "policyNumber", data: claimData },
      { label: "Phone", key: "phone", data: claimData },
      { label: "Email", key: "email", data: claimData },
      { label: "Address", key: "address", data: claimData },
    ],
    y
  );

  y = addSection(
    doc,
    "2. INCIDENT DETAILS",
    [
      { label: "Incident Type", key: "incidentType", data: claimData },
      { label: "Date", key: "incidentDate", data: claimData },
      { label: "Time", key: "incidentTime", data: claimData },
      { label: "Location", key: "incidentLocation", data: claimData },
      {
        label: "Description",
        key: "incidentDescription",
        data: claimData,
      },
      {
        label: "Weather / Road",
        key: "weatherConditions",
        data: claimData,
      },
    ],
    y
  );

  y = addSection(
    doc,
    "3. VEHICLE",
    [
      { label: "Make", key: "vehicleMake", data: claimData },
      { label: "Model", key: "vehicleModel", data: claimData },
      { label: "Year", key: "vehicleYear", data: claimData },
      { label: "Registration", key: "vehiclePlate", data: claimData },
      { label: "Condition", key: "vehicleStatus", data: claimData },
    ],
    y
  );

  y = addSection(
    doc,
    "4. DAMAGE",
    [
      { label: "Damaged Areas", key: "damagedAreas", data: claimData },
      {
        label: "Damage Description",
        key: "damageDescription",
        data: claimData,
      },
      {
        label: "Estimated Cost",
        key: "estimatedDamage",
        data: claimData,
      },
    ],
    y
  );

  if (claimData.otherPartyInvolved === "yes") {
    y = addSection(
      doc,
      "5. OTHER PARTY",
      [
        { label: "Name", key: "otherPartyName", data: claimData },
        { label: "Phone", key: "otherPartyPhone", data: claimData },
        {
          label: "Vehicle Make",
          key: "otherVehicleMake",
          data: claimData,
        },
        {
          label: "Vehicle Model",
          key: "otherVehicleModel",
          data: claimData,
        },
        {
          label: "Vehicle Plate",
          key: "otherVehiclePlate",
          data: claimData,
        },
        {
          label: "Insurance",
          key: "otherInsuranceCompany",
          data: claimData,
        },
        {
          label: "Policy Number",
          key: "otherPolicyNumber",
          data: claimData,
        },
      ],
      y
    );
  }

  y = addSection(
    doc,
    "6. POLICE, INJURIES & WITNESSES",
    [
      {
        label: "Police Contacted",
        key: "policeContacted",
        data: claimData,
      },
      {
        label: "Report Number",
        key: "policeReportNumber",
        data: claimData,
      },
      {
        label: "Emergency Services",
        key: "emergencyServices",
        data: claimData,
      },
      {
        label: "Injuries",
        key: "injuries",
        data: claimData,
      },
      {
        label: "Witnesses",
        key: "witnessInformation",
        data: claimData,
      },
    ],
    y
  );

  y += 5;

  if (y > 255) {
    doc.addPage();
    y = 20;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("ORIGINAL DESCRIPTION", 15, y);

  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  const descriptionLines = doc.splitTextToSize(
    description || "Not provided",
    175
  );

  doc.text(descriptionLines, 15, y);

  y += descriptionLines.length * 5 + 15;

  doc.setFontSize(8);
  doc.setTextColor(110, 110, 110);

  doc.text(
    "This document was prepared using information provided by the policyholder.",
    15,
    285
  );

  doc.save(`${claimNumber}.pdf`);
};