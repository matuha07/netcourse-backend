import { Request, Response } from "express";
import prisma from "../prisma";

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { lessonId } = req.params;
    const { title } = (req as any).validated.body;
    const quiz = await prisma.quiz.create({
      data: { lessonId: Number(lessonId), title },
    });
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ error: "Failed to create quiz" });
  }
};

export const getAllQuizzes = async (req: Request, res: Response) => {
  try {
    const { courseId, sectionId, lessonId } = req.params; 
    
    const quizzes = await prisma.quiz.findMany({
      where: { 
        lessonId: Number(lessonId) 
      },
      include: {
        lesson: true,
        questions: true,
      },
    });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
};

export const getQuizById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const quiz = await prisma.quiz.findUnique({
      where: { id: Number(id) },
      include: {
        lesson: true,
        questions: {
          include: { answers: true },
        },
      },
    });
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quiz" });
  }
};

export const updateQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title } = (req as any).validated.body;
    const updated = await prisma.quiz.update({
      where: { id: Number(id) },
      data: { title },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update quiz" });
  }
};

export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.quiz.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete quiz" });
  }
};