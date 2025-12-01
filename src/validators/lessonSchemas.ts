import { z } from "zod";

export const createLessonSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    contentType: z.enum(["video", "text"]),
    videoUrl: z.string().optional(),
    textContent: z.string().optional(),
    orderIndex: z.number().min(0),
  }),
  params: z.object({
    sectionId: z.string(), 
  }),
});

export type CreateLessonInput = z.infer<typeof createLessonSchema>["body"];

export const updateLessonSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    contentType: z.enum(["video", "text"]).optional(),
    videoUrl: z.string().optional(),
    textContent: z.string().optional(),
    orderIndex: z.number().min(0).optional(),
  }),
  params: z.object({
    lessonId: z.string(),
  }),
});

export type UpdateLessonInput = z.infer<typeof updateLessonSchema>["body"];
