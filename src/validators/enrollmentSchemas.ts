import { z } from "zod";

export const enrollSchema = z.object({
  body: z.object({
    userId: z.string(),
  }),
  params: z.object({
    courseId: z.string(),
  })
});

export type EnrollInput = z.infer<typeof enrollSchema>["body"];
