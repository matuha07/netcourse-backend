import { z } from "zod";

export const createBadgeSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().optional().nullable(),
    imageUrl: z.url().optional().nullable(),
    courseId: z.number().int().positive().optional().nullable(),
  }),
});

export type CreateBadgeInput = z.infer<typeof createBadgeSchema>["body"];

export const updateBadgeSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional().nullable(),
    imageUrl: z.url().optional().nullable(),
    courseId: z.number().int().positive().optional().nullable(),
  }),
});

export type UpdateBadgeInput = z.infer<typeof updateBadgeSchema>["body"];