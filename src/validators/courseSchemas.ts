import { z } from "zod";

export const createCourseSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    description: z.string().optional(),
  }),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>["body"];

export const updateCourseSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
