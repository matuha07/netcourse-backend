import { Request, Response } from "express";
import prisma from "../prisma";

export const createSection = async (req: Request, res: Response) => {
  try {
    const { courseId} = req.params;
    const { title, orderIndex } = (req as any).validated.body;
    const section = await prisma.section.create({
      data: { courseId: Number(courseId), title, orderIndex },
    });
    res.status(201).json(section);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create section" });
  }
};

export const getAllSections = async (req: Request, res: Response) => {
  try {
    const sections = await prisma.section.findMany({
      include: {
        lessons: true,
        course: true,
      },
    });
    res.json(sections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sections" });
  }
};

export const getSectionById = async (req: Request, res: Response) => {
  try {
    const { sectionId } = req.params;
    const section = await prisma.section.findUnique({
      where: { id: Number(sectionId) },
      include: {
        lessons: true,
        course: true,
      },
    });

    if (!section) {
      return res.status(404).json({ error: "Section not found" });
    }

    res.json(section);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch section" });
  }
};

export const updateSection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, orderIndex } = (req as any).validated.body;

    const updated = await prisma.section.update({
      where: { id: Number(id) },
      data: { title, orderIndex },
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update section" });
  }
};

export const deleteSection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.section.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete section" });
  }
};
