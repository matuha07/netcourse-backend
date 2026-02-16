import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { quizzes } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { lessonId } = req.params;
    const { title } = (req as any).validated.body;
    
    const [quiz] = await db.insert(quizzes).values({
      lessonId: Number(lessonId),
      title,
    }).returning();

    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ error: "Failed to create quiz" });
  }
};

export const getAllQuizzes = async (req: Request, res: Response) => {
  try {
    const { courseId, sectionId, lessonId } = req.params; 
    
    const quizzesList = await db.query.quizzes.findMany({
      where: eq(quizzes.lessonId, Number(lessonId)),
      with: {
        lesson: true,
        questions: true,
      },
    });

    res.json(quizzesList);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
};

export const getQuizById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const quiz = await db.query.quizzes.findFirst({
      where: eq(quizzes.id, Number(id)),
      with: {
        lesson: true,
        questions: {
          with: { answers: true },
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
    
    const [updated] = await db.update(quizzes)
      .set({ title })
      .where(eq(quizzes.id, Number(id)))
      .returning();

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update quiz" });
  }
};

export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await db.delete(quizzes)
      .where(eq(quizzes.id, Number(id)));

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete quiz" });
  }
};
