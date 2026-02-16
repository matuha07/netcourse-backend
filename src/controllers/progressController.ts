import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { progress } from "../drizzle/schema";
import { eq, and } from "drizzle-orm";
import { sql } from "drizzle-orm";

// public
export const getUserProgress = async (req: Request, res: Response) => {
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
};

export const updateUserProgress = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const { status } = req.body;
  const userId = (req as any).user.id;

  // Check if progress exists
  const existing = await db.query.progress.findFirst({
    where: and(
      eq(progress.userId, userId),
      eq(progress.courseId, Number(courseId))
    ),
  });

  let result;
  if (existing) {
    // Update existing
    [result] = await db.update(progress)
      .set({ status, updatedAt: new Date() })
      .where(and(
        eq(progress.userId, userId),
        eq(progress.courseId, Number(courseId))
      ))
      .returning();
  } else {
    // Create new
    [result] = await db.insert(progress)
      .values({
        userId,
        courseId: Number(courseId),
        status,
      })
      .returning();
  }

  res.json(result);
};

export const getAllCourseProgress = async (req: Request, res: Response) => {
  const { courseId } = req.params;

  const progressList = await db.query.progress.findMany({
    where: eq(progress.courseId, Number(courseId)),
    with: { user: true },
  });

  res.json(progressList);
};

// admin

export const getUserProgressAdmin = async (req: Request, res: Response) => {
  const { userId, courseId } = req.params;

  const userProgress = await db.query.progress.findFirst({
    where: and(
      eq(progress.userId, Number(userId)),
      eq(progress.courseId, Number(courseId))
    ),
  });

  if (!userProgress) return res.json({ status: "not_started" });

  res.json(userProgress);
};

export const updateUserProgressAdmin = async (req: Request, res: Response) => {
  const { courseId, userId } = req.params;
  const { status } = req.body;

  if (!["not_started", "in_progress", "completed"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  // Check if progress exists
  const existing = await db.query.progress.findFirst({
    where: and(
      eq(progress.userId, Number(userId)),
      eq(progress.courseId, Number(courseId))
    ),
  });

  let result;
  if (existing) {
    // Update existing
    [result] = await db.update(progress)
      .set({ status, updatedAt: new Date() })
      .where(and(
        eq(progress.userId, Number(userId)),
        eq(progress.courseId, Number(courseId))
      ))
      .returning();
  } else {
    // Create new
    [result] = await db.insert(progress)
      .values({
        userId: Number(userId),
        courseId: Number(courseId),
        status,
      })
      .returning();
  }

  res.json(result);
};
