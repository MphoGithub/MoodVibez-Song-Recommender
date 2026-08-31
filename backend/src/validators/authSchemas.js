// validators/authSchemas.js
import { z } from 'zod';

export const registerSchema = z.object({
    full_name: z.string().trim().min(1, "Full name is required"),
    username: z.string().trim().min(3, "Username must be at least 3 characters").max(30),
    email: z.string().trim().toLowerCase().email("Please provide a valid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain an uppercase letter")
        .regex(/[a-z]/, "Password must contain a lowercase letter")
        .regex(/[0-9]/, "Password must contain a number"),
    confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
});