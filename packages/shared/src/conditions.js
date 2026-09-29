export function evaluateConditions(conditions = [], values = {}) {
  if (!conditions.length) return true;
  return conditions.every((condition) => evaluateSingleCondition(condition, values));
}

function normalize(v) {
  return typeof v === "string" ? v.trim().toLowerCase() : v;
}

function evaluateSingleCondition({ field, operator, value }, values) {
  const actual = values[field];
  switch (operator) {
    case "equals": return normalize(actual) === normalize(value);
    case "not_equals": return normalize(actual) !== normalize(value);
    case "in": return Array.isArray(value) && value.map(normalize).includes(normalize(actual));
    case "greater_than": return Number(actual) > Number(value);
    case "less_than": return Number(actual) < Number(value);
    case "exists": return actual !== undefined && actual !== null && actual !== "";
    default: return false;
  }
}