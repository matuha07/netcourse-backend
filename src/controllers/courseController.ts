import { Request, Response } from "express";
import prisma from "../prisma";

export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, category } = req.body;
    const course = await prisma.course.create({
      data: { title, description, category },
    });
    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create course" });
  }
};

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        enrollments: true,
        sections: true,
      },
    });
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await prisma.course.findUnique({
      where: { id: Number(id) },
      include: {
        enrollments: true,
        sections: true,
      },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch course" });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;

    const updated = await prisma.course.update({
      where: { id: Number(id) },
      data: { title, description, category },
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update course" });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.course.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete course" });
  }
};
