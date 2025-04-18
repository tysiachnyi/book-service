function validateBookSchema(body) {
    const schema = {
        id: 'number',
        title: 'string',
        author: 'string',
        year: 'number',
    };
    // Check for required fields and their types
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
    // Check for additional properties not in our Book interface
    for (const key in body) {
        if (!['id', 'title', 'author', 'year', 'description', 'tags', 'genre', 'views', 'rating'].includes(key)) {
            return { valid: false, error: `Unexpected property: ${key}` };
        }
    }
    return { valid: true };
}
export default validateBookSchema;
//# sourceMappingURL=validation.js.map