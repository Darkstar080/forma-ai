export function validateSchemaFields(fields) {
  const errors = [];
  const seenIds = new Set();

  fields.forEach((field, index) => {
    if (seenIds.has(field.fieldId)) {
      errors.push(`Duplicate fieldId "${field.fieldId}" at position ${index}`);
    }
    for (const condition of field.showIf || []) {
      if (!seenIds.has(condition.field)) {
        errors.push(
          `Field "${field.fieldId}" has a showIf referencing "${condition.field}", which doesn't exist or comes after it in the field order`
        );
      }
    }
    seenIds.add(field.fieldId);
  });

  return errors;
}