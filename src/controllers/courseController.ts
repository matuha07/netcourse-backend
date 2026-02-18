import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { courses } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, category } = (req as any).validated.body;

    const [course] = await db
      .insert(courses)
      .values({
        title,
        description,
        category,
      })
      .returning();

    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create course" });
  }
};

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const coursesList = await db.query.courses.findMany({
      with: {
        enrollments: true,
        sections: true,
      },
    });

    res.json(coursesList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const course = await db.query.courses.findFirst({
      where: eq(courses.id, Number(id)),
      with: {
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
    const { title, description, category } = (req as any).validated.body;

    const [updated] = await db
      .update(courses)
      .set({ title, description, category })
      .where(eq(courses.id, Number(id)))
      .returning();

    if (!updated) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update course" });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await db.delete(courses).where(eq(courses.id, Number(id)));

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete course" });
  }
};
