import { Request, Response } from "express";
import prisma from "../prisma";

// public
export const getUserProgress = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const userId = (req as any).user.id;

  const progress = await prisma.progress.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: Number(courseId),
      },
    },
  });

  if (!progress) return res.json({ status: "not_started" });

  res.json(progress);
};

export const updateUserProgress = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const { status } = req.body;
  const userId = (req as any).user.id;

  const progress = await prisma.progress.upsert({
    where: {
      userId_courseId: {
        userId,
        courseId: Number(courseId),
      },
    },
    update: { status },
    create: {
      userId,
      courseId: Number(courseId),
      status,
    },
  });

  res.json(progress);
};

export const getAllCourseProgress = async (req: Request, res: Response) => {
  const { courseId } = req.params;

  const progress = await prisma.progress.findMany({
    where: { courseId: Number(courseId) },
    include: { user: true },
  });

  res.json(progress);
};

// admin

export const getUserProgressAdmin = async (req: Request, res: Response) => {
  const { userId, courseId } = req.params;

  const progress = await prisma.progress.findUnique({
    where: {
      userId_courseId: {
        userId: Number(userId),
        courseId: Number(courseId),
      },
    },
  });

  if (!progress) return res.json({ status: "not_started" });

  res.json(progress);
};

export const updateUserProgressAdmin = async (req: Request, res: Response) => {
  const { courseId, userId } = req.params;
  const { status } = req.body;

  if (!["not_started", "in_progress", "completed"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const progress = await prisma.progress.upsert({
    where: {
      userId_courseId: {
        userId: Number(userId),
        courseId: Number(courseId),
      },
    },
    update: { status },
    create: {
      userId: Number(userId),
      courseId: Number(courseId),
      status,
    },
  });

  res.json(progress);
};
