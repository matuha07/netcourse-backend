import { z } from "zod";

export const updateProgressSchema = z.object({
  body: z.object({
    lessonId: z.string(),
    userId: z.string(),
    completed: z.boolean(),
  }),
});

export type UpdateProgressInput = z.infer<typeof updateProgressSchema>["body"];
