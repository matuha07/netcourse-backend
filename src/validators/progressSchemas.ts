import { z } from "zod";

export const updateProgressSchema = z.object({
  params: z.object({
    courseId: z.string(),
  }),
  body: z.object({
    status: z.enum(["not_started", "in_progress", "completed"]),
  }),
});