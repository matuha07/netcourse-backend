import { Request, Response } from "express";
import prisma from "../prisma";

export const createEnrollment = async (req: Request, res: Response) => {
  try {
    const { userId } = (req as any).validated.body;
    const { courseId } = req.params;

    const currentUser = (req as any).user;

    if (currentUser.role !== "ADMIN" && currentUser.id !== Number(userId)) {
      return res
        .status(403)
        .json({ error: "forbidden: you can only enroll yourself" });
    }

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
    const currentUser = (req as any).user;

    const enrollments =
      currentUser.role === "ADMIN"
        ? await prisma.enrollment.findMany({
            where: { courseId: Number(courseId) },
            include: { user: true },
          })
        : await prisma.enrollment.findMany({
            where: {
              courseId: Number(courseId),
              userId: currentUser.id,
            },
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
    const currentUser = (req as any).user;

    const enrollment = await prisma.enrollment.findUnique({
      where: { id: Number(enrollmentId) },
    });

    if (!enrollment) {
      return res.status(404).json({ error: "enrollment not found" });
    }

    if (currentUser.role !== "ADMIN" && currentUser.id !== enrollment.userId) {
      return res
        .status(403)
        .json({ error: "forbidden: you can only delete your own enrollment" });
    }

    await prisma.enrollment.delete({
      where: { id: Number(enrollmentId) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete enrollment" });
  }
};
