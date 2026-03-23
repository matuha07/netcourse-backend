import { z } from "zod";

export const createForumReplySchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
  body: z.object({
    body: z.string().min(1),
  }),
});

export type CreateForumReplyInput = z.infer<typeof createForumReplySchema>["body"];

export const updateForumReplySchema = z.object({
  params: z.object({
    replyId: z.string(),
  }),
  body: z.object({
    body: z.string().min(1),
  }),
});

export type UpdateForumReplyInput = z.infer<typeof updateForumReplySchema>["body"];
