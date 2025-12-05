import { z } from "zod";

export const createLessonSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    contentType: z.enum(["video", "text", "quiz"]),
    videoUrl: z.string().optional().nullable(),
    textContent: z.string().optional().nullable(),
    orderIndex: z.number().min(0),
  }),
  params: z.object({
    sectionId: z.string(),
  }),
});

export type CreateLessonInput = z.infer<typeof createLessonSchema>["body"];

export const updateLessonSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    title: z.string().min(1).optional(),
    contentType: z.enum(["video", "text", "quiz"]).optional(),
    videoUrl: z.string().optional().nullable(),
    textContent: z.string().optional().nullable(),
    orderIndex: z.number().min(0).optional(),
  }),
});

export type UpdateLessonInput = z.infer<typeof updateLessonSchema>["body"];
