// middleware/validate.js
export const validate = (schema) => (req, res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: parsed.error.issues[0].message,
            errors: parsed.error.issues,
        });
    }
    req.body = parsed.data; // normalized (trimmed, lowercased) data replaces the raw input
    next();
};