import { z } from "zod";

export const createAnswerSchema = z.object({
  body: z.object({
    answerText: z.string().min(1),
    isCorrect: z.boolean(),
  }),
  params: z.object({
    questionId: z.string(),
  })
});

export type CreateAnswerInput = z.infer<typeof createAnswerSchema>["body"];

export const updateAnswerSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    text: z.string().optional(),
    isCorrect: z.boolean().optional(),
  }),
});

export type UpdateAnswerInput = z.infer<typeof updateAnswerSchema>;
