import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { forumPosts } from "../drizzle/schema";
import { eq, desc, sql } from "drizzle-orm";
import { sanitizeUserPublic } from "../utils/userPublicFields";

export const createForumPost = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { title, body } = (req as any).validated.body;

    const [post] = await db
      .insert(forumPosts)
      .values({
        userId,
        title,
        body,
      })
      .returning();

    const postWithRelations = await db.query.forumPosts.findFirst({
      where: eq(forumPosts.id, post.id),
      with: {
        user: true,
        replies: {
          with: {
            user: true,
          },
        },
      },
    });

    if (!postWithRelations) {
      return res.status(201).json(post);
    }

    res.status(201).json({
      ...postWithRelations,
      user: sanitizeUserPublic(postWithRelations.user),
      replies: postWithRelations.replies?.map((reply) => ({
        ...reply,
        user: sanitizeUserPublic(reply.user),
      })),
    });
  } catch (error) {
    console.error("[forumPostController] createForumPost error:", error);
    res.status(500).json({ error: "Failed to create forum post" });
  }
};

export const getAllForumPosts = async (_req: Request, res: Response) => {
  try {
    const page = Math.max(1, Number(_req.query.page) || 1);
    const limitRaw = Number(_req.query.limit) || 20;
    const limit = Math.min(Math.max(1, limitRaw), 100);
    const offset = (page - 1) * limit;

    const [countResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(forumPosts);
    const total = Number(countResult?.count ?? 0);
    const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

    const posts = await db.query.forumPosts.findMany({
      with: {
        user: true,
        replies: {
          with: {
            user: true,
          },
        },
      },
      orderBy: desc(forumPosts.createdAt),
      limit,
      offset,
    });

    res.json({
      data: posts.map((post) => ({
        ...post,
        user: sanitizeUserPublic(post.user),
        replies: post.replies?.map((reply) => ({
          ...reply,
          user: sanitizeUserPublic(reply.user),
        })),
      })),
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("[forumPostController] getAllForumPosts error:", error);
    res.status(500).json({ error: "Failed to fetch forum posts" });
  }
};

export const getForumPostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const post = await db.query.forumPosts.findFirst({
      where: eq(forumPosts.id, Number(postId)),
      with: {
        user: true,
        replies: {
          with: {
            user: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Forum post not found" });
    }

    res.json({
      ...post,
      user: sanitizeUserPublic(post.user),
      replies: post.replies?.map((reply) => ({
        ...reply,
        user: sanitizeUserPublic(reply.user),
      })),
    });
  } catch (error) {
    console.error("[forumPostController] getForumPostById error:", error);
    res.status(500).json({ error: "Failed to fetch forum post" });
  }
};

export const updateForumPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { title, body } = (req as any).validated.body;
    const currentUser = (req as any).user;

    const existing = await db.query.forumPosts.findFirst({
      where: eq(forumPosts.id, Number(postId)),
    });

    if (!existing) {
      return res.status(404).json({ error: "Forum post not found" });
    }

    if (currentUser.role !== "ADMIN" && existing.userId !== currentUser.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const [updated] = await db
      .update(forumPosts)
      .set({
        title,
        body,
        updatedAt: new Date(),
      })
      .where(eq(forumPosts.id, Number(postId)))
      .returning();

    const updatedWithRelations = await db.query.forumPosts.findFirst({
      where: eq(forumPosts.id, updated.id),
      with: {
        user: true,
        replies: {
          with: {
            user: true,
          },
        },
      },
    });

    if (!updatedWithRelations) {
      return res.json(updated);
    }

    res.json({
      ...updatedWithRelations,
      user: sanitizeUserPublic(updatedWithRelations.user),
      replies: updatedWithRelations.replies?.map((reply) => ({
        ...reply,
        user: sanitizeUserPublic(reply.user),
      })),
    });
  } catch (error) {
    console.error("[forumPostController] updateForumPost error:", error);
    res.status(500).json({ error: "Failed to update forum post" });
  }
};

export const deleteForumPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const currentUser = (req as any).user;

    const existing = await db.query.forumPosts.findFirst({
      where: eq(forumPosts.id, Number(postId)),
    });

    if (!existing) {
      return res.status(404).json({ error: "Forum post not found" });
    }

    if (currentUser.role !== "ADMIN" && existing.userId !== currentUser.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await db.delete(forumPosts).where(eq(forumPosts.id, Number(postId)));

    res.status(204).send();
  } catch (error) {
    console.error("[forumPostController] deleteForumPost error:", error);
    res.status(500).json({ error: "Failed to delete forum post" });
  }
};
