import { z } from "zod";

export const courseRatingParamsSchema = z.object({
  params: z.object({
    courseId: z.string(),
  }),
});

export const upsertCourseRatingSchema = z.object({
  params: z.object({
    courseId: z.string(),
  }),
  body: z.object({
    rating: z.number().int().min(1).max(5),
  }),
});
