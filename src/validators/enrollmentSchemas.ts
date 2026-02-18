import { z } from "zod";

export const enrollSchema = z.object({
  body: z.object({
    userId: z.number(),
  }),
  params: z.object({
    courseId: z.string(),
  })
});

export type EnrollInput = z.infer<typeof enrollSchema>["body"];
