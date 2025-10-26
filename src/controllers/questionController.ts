import { Request, Response } from "express";
import prisma from "../prisma";

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const { quizId, questionText, questionType } = req.body;
    const question = await prisma.question.create({
      data: { quizId, questionText, questionType },
    });
    res.status(201).json(question);
  } catch {
    res.status(500).json({ error: "Failed to create question" });
  }
};

export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await prisma.question.findMany({
      include: { answers: true, quiz: true },
    });
    res.json(questions);
  } catch {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};

export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const question = await prisma.question.findUnique({
      where: { id: Number(id) },
      include: { answers: true, quiz: true },
    });
    if (!question) return res.status(404).json({ error: "Question not found" });
    res.json(question);
  } catch {
    res.status(500).json({ error: "Failed to fetch question" });
  }
};

export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { questionText, questionType } = req.body;
    const updated = await prisma.question.update({
      where: { id: Number(id) },
      data: { questionText, questionType },
    });
    res.json(updated);
  } catch {
    res.status(500).json({ error: "Failed to update question" });
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.question.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Failed to delete question" });
  }
};
