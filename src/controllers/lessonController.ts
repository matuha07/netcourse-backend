import { Request, Response } from "express";
import prisma from "../prisma";
 
export const createLesson = async (req: Request, res: Response) => {
    try {
      const { sectionId } = req.params;
      const { title, contentType, videoUrl, textContent, orderIndex} = (req as any).validated.body;

      const lesson = await prisma.lesson.create({
        data: {
          sectionId: Number(sectionId),
          title,
          contentType,
          videoUrl,
          textContent,
          orderIndex
        }
      })

      res.status(201).json(lesson);
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "failed to create lesson"})
    }
}

export const getAllLessons = async (req: Request, res: Response) => {
  try {
    const { sectionId } = req.params; 
    const lessons = await prisma.lesson.findMany({
      where: { sectionId: Number(sectionId) }, 
      include: {
        section: true,
        quizzes: true,
      },
    });
    res.json(lessons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
};



export const getLessonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const lesson = await prisma.lesson.findUnique({
      where: { id: Number(id) },
      include: {
        section: true,
        quizzes: true,
      },
    });

    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    res.json(lesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch lesson" });
  }
};

export const updateLesson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, contentType, videoUrl, textContent, orderIndex } = (req as any).validated.body;

    const updated = await prisma.lesson.update({
      where: { id: Number(id) },
      data: { title, contentType, videoUrl, textContent, orderIndex },
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update lesson" });
  }
};

export const deleteLesson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.lesson.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete lesson" });
  }
};
