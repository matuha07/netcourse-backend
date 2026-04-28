import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { courseRatings, enrollments } from "../drizzle/schema";
import { and, eq, sql } from "drizzle-orm";

const getCourseRatingSummary = async (courseId: number) => {
  const [row] = await db
    .select({
      average: sql<number>`avg(${courseRatings.rating})`,
      count: sql<number>`count(*)`,
    })
    .from(courseRatings)
    .where(eq(courseRatings.courseId, courseId));

  const count = Number(row?.count ?? 0);
  const average = count > 0 ? Number(row?.average ?? 0) : null;

  return { average, count };
};

export const getCourseRatings = async (req: Request, res: Response) => {
  try {
    const courseId = Number(req.params.courseId);
    if (!Number.isInteger(courseId) || courseId <= 0) {
      return res.status(400).json({ error: "invalid course id" });
    }

    const summary = await getCourseRatingSummary(courseId);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch course ratings" });
  }
};

export const getMyCourseRating = async (req: Request, res: Response) => {
  try {
    const courseId = Number(req.params.courseId);
    if (!Number.isInteger(courseId) || courseId <= 0) {
      return res.status(400).json({ error: "invalid course id" });
    }

    const userId = (req as any).user.id;
    const rating = await db.query.courseRatings.findFirst({
      where: and(
        eq(courseRatings.courseId, courseId),
        eq(courseRatings.userId, userId),
      ),
    });

    if (!rating) {
      return res.json({ rating: null });
    }

    res.json({ rating: rating.rating });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch course rating" });
  }
};

export const upsertCourseRating = async (req: Request, res: Response) => {
  try {
    const courseId = Number((req as any).validated.params.courseId);
    const { rating } = (req as any).validated.body;
    const userId = (req as any).user.id;

    const enrollment = await db.query.enrollments.findFirst({
      where: and(
        eq(enrollments.courseId, courseId),
        eq(enrollments.userId, userId),
      ),
    });

    if (!enrollment) {
      return res
        .status(403)
        .json({ error: "Only enrolled users can rate this course" });
    }

    const existing = await db.query.courseRatings.findFirst({
      where: and(
        eq(courseRatings.courseId, courseId),
        eq(courseRatings.userId, userId),
      ),
    });

    let result;
    if (existing) {
      [result] = await db
        .update(courseRatings)
        .set({ rating, updatedAt: new Date() })
        .where(eq(courseRatings.id, existing.id))
        .returning();
    } else {
      [result] = await db
        .insert(courseRatings)
        .values({ userId, courseId, rating })
        .returning();
    }

    const summary = await getCourseRatingSummary(courseId);

    res.json({
      rating: result.rating,
      average: summary.average,
      count: summary.count,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to save course rating" });
  }
};
