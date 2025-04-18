// Validation function for book schema
function validateBookSchema(body) {
  const schema = {
    id: "number",
    title: "string",
    author: "string",
    year: "number",
  };

  for (const key in schema) {
    if (!Object.prototype.hasOwnProperty.call(body, key)) {
      return { valid: false, error: `Missing required property: ${key}` };
    }
    if (typeof body[key] !== schema[key]) {
      return {
        valid: false,
        error: `Invalid type for property: ${key}, expected ${schema[key]}`,
      };
    }
  }

  // Check for additional properties
  for (const key in body) {
    if (!Object.prototype.hasOwnProperty.call(schema, key)) {
      return { valid: false, error: `Unexpected property: ${key}` };
    }
  }

  return { valid: true };
}
export default validateBookSchema;
