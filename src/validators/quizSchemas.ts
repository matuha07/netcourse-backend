import { z } from "zod";

export const createQuizSchema = z.object({
  body: z.object({
    title: z.string().min(3),
  }),
  params: z.object({
    lessonId: z.string()
  })
});

export type CreateQuizInput = z.infer<typeof createQuizSchema>["body"];

export const updateQuizSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    title: z.string().optional(),
  }),
});

export const submitQuizSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    answers: z.array(
      z.object({
        questionId: z.number().int(),
        answerIds: z.array(z.number().int()).optional(),
      }),
    ).optional(),
  }),
});

export type UpdateQuizInput = z.infer<typeof updateQuizSchema>;
