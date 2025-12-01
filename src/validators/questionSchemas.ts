import { z } from "zod";

export const createQuestionSchema = z.object({
  body: z.object({
    questionType: z.string(),
    questionText: z.string().min(3),
  }),
  params: z.object({
    quizId: z.string(),
  })
});

export type CreateQuestionInput = z.infer<typeof createQuestionSchema>["body"];

export const updateQuestionSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    questionText: z.string().optional(),
  }),
});

export type UpdateQuestionInput = z.infer<typeof updateQuestionSchema>;
