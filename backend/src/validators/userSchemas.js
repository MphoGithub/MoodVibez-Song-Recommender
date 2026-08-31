import {z} from 'zod'


export const updateProfileSchema = z.object({
    full_name: z.string().trim().min(1).optional(),
    username: z.string().trim().min(3).max(30).optional(),
    email: z.string().trim().toLowerCase().email("Please provide a valid email address").optional(),
    password: passwordRules.optional(),
    current_password: z.string().optional(),
}).refine((data) => !data.password || !!data.current_password, {
    message: "Current password is required to set a new password",
    path: ["current_password"],
});