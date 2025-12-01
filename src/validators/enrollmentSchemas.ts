import { z } from "zod";

export const enrollSchema = z.object({
  body: z.object({
    courseId: z.string(),
    userId: z.string(),
  }),
});

export type EnrollInput = z.infer<typeof enrollSchema>["body"];
