import * as z from "zod";

export const RegisterSchema = z.object({
    username: z.string().min(1, {
        message: "Username is required",
    }),
    email: z.string().email({
        message: "Invalid email format",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }),
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Invalid email format",    
    }),
    password: z.string().min(1, {
        message: "Password is required",
    })
})