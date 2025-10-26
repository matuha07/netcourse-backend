import { Request, Response } from "express";
import prisma from "../prisma";

export const createEnrollment = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const { courseId } = req.params;
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: Number(userId),
        courseId: Number(courseId),
      },
    });
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create enrollment" });
  }
};

export const getEnrollments = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const enrollments = await prisma.enrollment.findMany({
      where: { courseId: Number(courseId) },
      include: { user: true },
    });
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch enrollments" });
  }
};

export const deleteEnrollment = async (req: Request, res: Response) => {
  try {
    const { enrollmentId } = req.params;
    await prisma.enrollment.delete({
      where: { id: Number(enrollmentId) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete enrollment" });
  }
};
