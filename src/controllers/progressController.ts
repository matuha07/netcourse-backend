import { Request, Response } from "express";
import prisma from "../prisma";

export const getLessonProgress = async (req: Request, res: Response) => {
  try {
    const { lessonId } = req.params;
    const progress = await prisma.progress.findMany({
      where: { lessonId: Number(lessonId) },
      include: { user: true },
    });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch progress" });
  }
};

export const updateProgress = async (req: Request, res: Response) => {
  try {
    const { lessonId } = req.params;
    const { userId, status } = req.body;
    const updated = await prisma.progress.upsert({
      where: { userId_lessonId: { userId, lessonId: Number(lessonId) } },
      update: { status },
      create: { userId, lessonId: Number(lessonId), status },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update progress" });
  }
};
