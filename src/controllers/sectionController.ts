import { Request, Response } from "express";
import prisma from "../prisma";

/**
 * Create a section scoped to a specific course (courseId from route params).
 */
export const createSection = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const { title, orderIndex } = (req as any).validated.body;

    if (!courseId) {
      return res.status(400).json({ error: "Missing courseId parameter" });
    }

    const course = await prisma.course.findUnique({
      where: { id: Number(courseId) },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const section = await prisma.section.create({
      data: { courseId: Number(courseId), title, orderIndex },
    });

    res.status(201).json(section);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create section" });
  }
};

/**
 * Get all sections for a specific course (scoped by courseId).
 */
export const getAllSections = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json({ error: "Missing courseId parameter" });
    }

    console.debug(
      `[sectionController] getAllSections received courseId=${courseId}`,
    );

    const sections = await prisma.section.findMany({
      where: { courseId: Number(courseId) },
      include: {
        lessons: true,
      },
      orderBy: {
        orderIndex: "asc",
      },
    });

    console.debug(
      `[sectionController] getAllSections returning ${Array.isArray(sections) ? sections.length : 0} sections for courseId=${courseId}`,
    );

    // Debug headers: indicate that this response corresponds to requested courseId and how many sections returned
    try {
      res.setHeader("X-Debug-CourseId", String(courseId));
      res.setHeader(
        "X-Debug-Sections-Count",
        String(Array.isArray(sections) ? sections.length : 0),
      );
    } catch (err) {
      console.debug("[sectionController] failed to set debug headers", err);
    }

    res.json(sections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sections" });
  }
};

/**
 * Get a single section by id, but ensure it belongs to the provided courseId.
 */
export const getSectionById = async (req: Request, res: Response) => {
  try {
    const { courseId, sectionId } = req.params;

    if (!courseId || !sectionId) {
      return res.status(400).json({ error: "Missing route parameters" });
    }

    console.log(
      `[sectionController] getSectionById called courseId=${courseId} sectionId=${sectionId}`,
    );

    const section = await prisma.section.findUnique({
      where: { id: Number(sectionId) },
      include: {
        lessons: true,
        course: true,
      },
    });

    if (!section || section.courseId !== Number(courseId)) {
      console.log(
        `[sectionController] section not found or mismatch: returnedSection.courseId=${section?.courseId}`,
      );
      return res
        .status(404)
        .json({ error: "Section not found for this course" });
    }

    // Debug headers for single-section response
    try {
      res.setHeader("X-Debug-Requested-CourseId", String(courseId));
      res.setHeader("X-Debug-Section-CourseId", String(section.courseId));
      res.setHeader("X-Debug-Section-Id", String(section.id));
    } catch (err) {
      console.debug(
        "[sectionController] failed to set debug headers for getSectionById",
        err,
      );
    }

    res.json(section);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch section" });
  }
};

/**
 * Update a section. Uses route param `sectionId` and ensures section belongs to courseId.
 */
export const updateSection = async (req: Request, res: Response) => {
  try {
    const { courseId, sectionId } = req.params;
    const { title, orderIndex } = (req as any).validated.body;

    if (!courseId || !sectionId) {
      return res.status(400).json({ error: "Missing route parameters" });
    }

    const section = await prisma.section.findUnique({
      where: { id: Number(sectionId) },
    });

    if (!section || section.courseId !== Number(courseId)) {
      return res
        .status(404)
        .json({ error: "Section not found for this course" });
    }

    const updated = await prisma.section.update({
      where: { id: Number(sectionId) },
      data: { title, orderIndex },
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update section" });
  }
};

/**
 * Delete a section. Uses route param `sectionId` and ensures section belongs to courseId.
 */
export const deleteSection = async (req: Request, res: Response) => {
  try {
    const { courseId, sectionId } = req.params;

    if (!courseId || !sectionId) {
      return res.status(400).json({ error: "Missing route parameters" });
    }

    const section = await prisma.section.findUnique({
      where: { id: Number(sectionId) },
    });

    if (!section || section.courseId !== Number(courseId)) {
      return res
        .status(404)
        .json({ error: "Section not found for this course" });
    }

    await prisma.section.delete({
      where: { id: Number(sectionId) },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete section" });
  }
};
