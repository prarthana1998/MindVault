import { z } from "zod";

export const journalSchema = z.object({
    title: z.string().min(1, "Journal Entry cannot be without a title"),
    content: z.string().min(1, "Journal Entry cannot be blank"),
    mood: z.string().min(1, "Mood is required"),
    collectionId: z.string().optional(),
});

export const collectionSchema  = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
});