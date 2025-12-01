import { z } from "zod";

export const createSectionSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    orderIndex: z.number().min(0),
  }),
  params: z.object({
    courseId: z.string(), 
  }),
});


export type CreateSectionInput = z.infer<typeof createSectionSchema>["body"];

export const updateSectionSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    orderIndex: z.number().min(0),
  }),
  params: z.object({
    sectionId: z.string(), 
  }),
});

export type UpdateSectionInput = z.infer<typeof updateSectionSchema>;
