import { z } from "zod";

export const todoSchema = z.object({
  title: z
    .string()
    .min(5, "Min 5 length title required")
    .max(35, "Title is too long"),
  description: z
    .string()
    .min(10, "Min 10 length title required")
    .max(99, "description is too long"),
  completed: z.boolean().optional(),
});
