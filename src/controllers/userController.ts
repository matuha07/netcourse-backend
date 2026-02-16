import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username, avatarUrl } = (req as any).validated
      .body;
    
    const [user] = await db.insert(users).values({
      email,
      password,
      username,
      avatarUrl,
    }).returning();

    res.status(201).json(user);
  } catch (error: any) {
    console.error("Error creating user:", error);

    // Drizzle throws different errors - check for unique constraint violation
    if (error?.code === '23505' || error?.message?.includes('unique')) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    res.status(500).json({ error: "Failed to create user" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const usersList = await db.query.users.findMany({
      with: {
        enrollments: true,
        progresses: true,
      },
    });

    res.json(usersList);
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

    const [user] = await db.update(users)
      .set({
        email,
        password,
        username,
        avatarUrl,
      })
      .where(eq(users.id, targetUserId))
      .returning();

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

    await db.delete(users)
      .where(eq(users.id, targetUserId));

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

    const user = await db.query.users.findFirst({
      where: eq(users.id, targetUserId),
      with: {
        enrollments: true,
        progresses: true,
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
