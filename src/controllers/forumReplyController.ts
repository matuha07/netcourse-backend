import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { forumPosts, forumReplies } from "../drizzle/schema";
import { eq, asc, sql } from "drizzle-orm";
import { sanitizeUserPublic } from "../utils/userPublicFields";

export const createForumReply = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { postId } = req.params;
    const { body } = (req as any).validated.body;

    const post = await db.query.forumPosts.findFirst({
      where: eq(forumPosts.id, Number(postId)),
    });

    if (!post) {
      return res.status(404).json({ error: "Forum post not found" });
    }

    const [reply] = await db
      .insert(forumReplies)
      .values({
        postId: Number(postId),
        userId,
        body,
      })
      .returning();

    const replyWithRelations = await db.query.forumReplies.findFirst({
      where: eq(forumReplies.id, reply.id),
      with: {
        user: true,
        post: true,
      },
    });

    if (!replyWithRelations) {
      return res.status(201).json(reply);
    }

    res.status(201).json({
      ...replyWithRelations,
      user: sanitizeUserPublic(replyWithRelations.user),
    });
  } catch (error) {
    console.error("[forumReplyController] createForumReply error:", error);
    res.status(500).json({ error: "Failed to create forum reply" });
  }
};

export const getForumRepliesForPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const page = Math.max(1, Number(req.query.page) || 1);
    const limitRaw = Number(req.query.limit) || 20;
    const limit = Math.min(Math.max(1, limitRaw), 100);
    const offset = (page - 1) * limit;

    const [countResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(forumReplies)
      .where(eq(forumReplies.postId, Number(postId)));
    const total = Number(countResult?.count ?? 0);
    const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

    const replies = await db.query.forumReplies.findMany({
      where: eq(forumReplies.postId, Number(postId)),
      with: {
        user: true,
      },
      orderBy: asc(forumReplies.createdAt),
      limit,
      offset,
    });

    res.json({
      data: replies.map((reply) => ({
        ...reply,
        user: sanitizeUserPublic(reply.user),
      })),
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("[forumReplyController] getForumRepliesForPost error:", error);
    res.status(500).json({ error: "Failed to fetch forum replies" });
  }
};

export const updateForumReply = async (req: Request, res: Response) => {
  try {
    const { replyId } = req.params;
    const { body } = (req as any).validated.body;
    const currentUser = (req as any).user;

    const existing = await db.query.forumReplies.findFirst({
      where: eq(forumReplies.id, Number(replyId)),
    });

    if (!existing) {
      return res.status(404).json({ error: "Forum reply not found" });
    }

    if (currentUser.role !== "ADMIN" && existing.userId !== currentUser.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const [updated] = await db
      .update(forumReplies)
      .set({
        body,
        updatedAt: new Date(),
      })
      .where(eq(forumReplies.id, Number(replyId)))
      .returning();

    const updatedWithRelations = await db.query.forumReplies.findFirst({
      where: eq(forumReplies.id, updated.id),
      with: {
        user: true,
        post: true,
      },
    });

    if (!updatedWithRelations) {
      return res.json(updated);
    }

    res.json({
      ...updatedWithRelations,
      user: sanitizeUserPublic(updatedWithRelations.user),
    });
  } catch (error) {
    console.error("[forumReplyController] updateForumReply error:", error);
    res.status(500).json({ error: "Failed to update forum reply" });
  }
};

export const deleteForumReply = async (req: Request, res: Response) => {
  try {
    const { replyId } = req.params;
    const currentUser = (req as any).user;

    const existing = await db.query.forumReplies.findFirst({
      where: eq(forumReplies.id, Number(replyId)),
    });

    if (!existing) {
      return res.status(404).json({ error: "Forum reply not found" });
    }

    if (currentUser.role !== "ADMIN" && existing.userId !== currentUser.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await db.delete(forumReplies).where(eq(forumReplies.id, Number(replyId)));

    res.status(204).send();
  } catch (error) {
    console.error("[forumReplyController] deleteForumReply error:", error);
    res.status(500).json({ error: "Failed to delete forum reply" });
  }
};
