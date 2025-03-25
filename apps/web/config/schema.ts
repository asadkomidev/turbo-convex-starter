import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const codeSchema = z.object({
  code: z.string().min(6, "Code must be 6 characters long"),
  email: z.string().email(),
});

export type CodeSchemaType = z.infer<typeof codeSchema>;
export type EmailSchemaType = z.infer<typeof emailSchema>;
