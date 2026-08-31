import { z } from 'zod'


export const updateProfileSchema = z.object({
    full_name: z.string().trim().min(1).optional(),
    username: z.string().trim().min(3).max(30).optional(),
    email: z.string().trim().toLowerCase().email("Please provide a valid email address").optional(),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain an uppercase letter")
        .regex(/[a-z]/, "Password must contain a lowercase letter")
        .regex(/[0-9]/, "Password must contain a number").optional(),
    current_password: z.string().optional(),
}).refine((data) => !data.password || !!data.current_password, {
    message: "Current password is required to set a new password",
    path: ["current_password"],
});