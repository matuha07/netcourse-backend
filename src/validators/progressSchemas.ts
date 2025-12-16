import { z } from "zod";

export const updateProgressSchema = z.object({
  body: z.object({
    status: z.enum(["not_started", "in_progress", "completed"]),
  }),
});
