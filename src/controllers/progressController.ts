import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { progress, certifications, badges, userBadges } from "../drizzle/schema";
import { eq, and } from "drizzle-orm";
import { randomBytes } from "crypto";
import { sanitizeUserPublic } from "../utils/userPublicFields";

const awardOnCompletion = async (userId: number, courseId: number) => {
  const existingCert = await db.query.certifications.findFirst({
    where: and(
      eq(certifications.userId, userId),
      eq(certifications.courseId, courseId)
    ),
  });

  if (!existingCert) {
    await db.insert(certifications).values({
      userId,
      courseId,
      certificateCode: randomBytes(8).toString("hex"),
    });
  }

  const badge = await db.query.badges.findFirst({
    where: eq(badges.courseId, courseId),
  });

  if (badge) {
    const existingBadge = await db.query.userBadges.findFirst({
      where: and(
        eq(userBadges.userId, userId),
        eq(userBadges.badgeId, badge.id)
      ),
    });

    if (!existingBadge) {
      await db.insert(userBadges).values({ userId, badgeId: badge.id });
    }
  }
};

export const getUserProgress = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const userId = (req as any).user.id;

    const userProgress = await db.query.progress.findFirst({
      where: and(
        eq(progress.userId, userId),
        eq(progress.courseId, Number(courseId))
      ),
    });

    if (!userProgress) return res.json({ status: "not_started" });

    res.json(userProgress);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch progress" });
  }
};

export const updateUserProgress = async (req: Request, res: Response) => {
  try {
    const courseId = Number((req as any).validated.params.courseId);
    const { status } = (req as any).validated.body;
    const userId = (req as any).user.id;

    const existing = await db.query.progress.findFirst({
      where: and(
        eq(progress.userId, userId),
        eq(progress.courseId, courseId)
      ),
    });

    let result;
    if (existing) {
      [result] = await db.update(progress)
        .set({ status, updatedAt: new Date() })
        .where(and(
          eq(progress.userId, userId),
          eq(progress.courseId, courseId)
        ))
        .returning();
    } else {
      [result] = await db.insert(progress)
        .values({ userId, courseId, status })
        .returning();
    }

    if (status === "completed") {
      await awardOnCompletion(userId, courseId);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update progress" });
  }
};

export const getAllCourseProgress = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;

    const progressList = await db.query.progress.findMany({
      where: eq(progress.courseId, Number(courseId)),
      with: { user: true },
    });

    res.json(
      progressList.map((item) => ({
        ...item,
        user: sanitizeUserPublic(item.user),
      })),
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch progress" });
  }
};

export const getUserProgressAdmin = async (req: Request, res: Response) => {
  try {
    const { userId, courseId } = req.params;

    const userProgress = await db.query.progress.findFirst({
      where: and(
        eq(progress.userId, Number(userId)),
        eq(progress.courseId, Number(courseId))
      ),
    });

    if (!userProgress) return res.json({ status: "not_started" });

    res.json(userProgress);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch progress" });
  }
};

export const updateUserProgressAdmin = async (req: Request, res: Response) => {
  try {
    const { courseId, userId } = req.params;
    const { status } = (req as any).validated.body;

    const existing = await db.query.progress.findFirst({
      where: and(
        eq(progress.userId, Number(userId)),
        eq(progress.courseId, Number(courseId))
      ),
    });

    let result;
    if (existing) {
      [result] = await db.update(progress)
        .set({ status, updatedAt: new Date() })
        .where(and(
          eq(progress.userId, Number(userId)),
          eq(progress.courseId, Number(courseId))
        ))
        .returning();
    } else {
      [result] = await db.insert(progress)
        .values({
          userId: Number(userId),
          courseId: Number(courseId),
          status,
        })
        .returning();
    }

    if (status === "completed") {
      await awardOnCompletion(Number(userId), Number(courseId));
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update progress" });
  }
};
