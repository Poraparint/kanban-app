import z from "zod";

export const CreateBoardSchema = z.object({
    title: z.string().min(1, "Title is required"),
})

export const InviteMemberSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export const CreateTaskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    userId: z.string().optional(),
});