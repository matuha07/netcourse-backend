import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { userSocialLinks } from "../drizzle/schema";
import { eq, and } from "drizzle-orm";

export const getSocialLinks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const links = await db.query.userSocialLinks.findMany({
      where: eq(userSocialLinks.userId, userId),
    });

    res.json(links);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch social links" });
  }
};

export const createSocialLink = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { platform, url } = (req as any).validated.body;

    const [link] = await db.insert(userSocialLinks).values({
      userId,
      platform,
      url,
    }).returning();

    res.status(201).json(link);
  } catch (error) {
    res.status(500).json({ error: "Failed to create social link" });
  }
};

export const updateSocialLink = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const { platform, url } = (req as any).validated.body;

    const existing = await db.query.userSocialLinks.findFirst({
      where: and(
        eq(userSocialLinks.id, Number(id)),
        eq(userSocialLinks.userId, userId)
      ),
    });

    if (!existing) {
      return res.status(404).json({ error: "Social link not found" });
    }

    const [updated] = await db.update(userSocialLinks)
      .set({ platform, url })
      .where(eq(userSocialLinks.id, Number(id)))
      .returning();

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update social link" });
  }
};

export const deleteSocialLink = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;

    const existing = await db.query.userSocialLinks.findFirst({
      where: and(
        eq(userSocialLinks.id, Number(id)),
        eq(userSocialLinks.userId, userId)
      ),
    });

    if (!existing) {
      return res.status(404).json({ error: "Social link not found" });
    }

    await db.delete(userSocialLinks)
      .where(eq(userSocialLinks.id, Number(id)));

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete social link" });
  }
};