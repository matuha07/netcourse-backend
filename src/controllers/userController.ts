import { Request, Response } from "express";
import prisma from "../prisma";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username, avatarUrl } = (req as any).validated
      .body;
    const user = await prisma.user.create({
      data: {
        email,
        password,
        username,
        avatarUrl,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);

    if (error.code === "P2002") {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    res.status(500).json({ error: "Failed to create user" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        enrollments: true,
        progress: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "failed to fetch users" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username, avatarUrl } = (req as any).validated
      .body;
    const { id } = req.params;
    const currentUser = (req as any).user;

    const targetUserId = Number(id);

    if (currentUser.role !== "ADMIN" && currentUser.id !== targetUserId) {
      return res
        .status(403)
        .json({ error: "forbidden: you can only update your own account" });
    }

    const user = await prisma.user.update({
      where: { id: targetUserId },
      data: {
        email,
        password,
        username,
        avatarUrl,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "failed to update user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const currentUser = (req as any).user;

    const targetUserId = Number(id);

    if (currentUser.role !== "ADMIN" && currentUser.id !== targetUserId) {
      return res
        .status(403)
        .json({ error: "forbidden: you can only delete your own account" });
    }

    await prisma.user.delete({
      where: { id: targetUserId },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "failed to delete user" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const currentUser = (req as any).user;

    const targetUserId = Number(id);

    if (currentUser.role !== "ADMIN" && currentUser.id !== targetUserId) {
      return res
        .status(403)
        .json({ error: "forbidden: you can only view your own account" });
    }

    const user = await prisma.user.findUnique({
      where: { id: targetUserId },
      include: {
        enrollments: true,
        progress: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "failed to fetch user" });
  }
};
