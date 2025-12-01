import { Request, Response } from "express";
import prisma from "../prisma";

export const createAnswer = async (req: Request, res: Response) => {
  try {
    const { questionId } = req.params;
    const { answerText, isCorrect } = (req as any).validated.body;
    const answer = await prisma.answer.create({
      data: { questionId: Number(questionId), answerText, isCorrect },
    });
    res.status(201).json(answer);
  } catch {
    res.status(500).json({ error: "Failed to create answer" });
  }
};

export const getAllAnswers = async (req: Request, res: Response) => {
  try {
    const answers = await prisma.answer.findMany({
      include: { question: true },
    });
    res.json(answers);
  } catch {
    res.status(500).json({ error: "Failed to fetch answers" });
  }
};

export const getAnswerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const answer = await prisma.answer.findUnique({
      where: { id: Number(id) },
      include: { question: true },
    });
    if (!answer) return res.status(404).json({ error: "Answer not found" });
    res.json(answer);
  } catch {
    res.status(500).json({ error: "Failed to fetch answer" });
  }
};

export const updateAnswer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { answerText, isCorrect } = (req as any).validated.body;
    const updated = await prisma.answer.update({
      where: { id: Number(id) },
      data: { answerText, isCorrect },
    });
    res.json(updated);
  } catch {
    res.status(500).json({ error: "Failed to update answer" });
  }
};

export const deleteAnswer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.answer.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Failed to delete answer" });
  }
};
