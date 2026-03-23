import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { sanitizeUserPrivate } from "../utils/userPublicFields";

const sanitizeUserWithRelations = (user: any) => {
  if (!user) return user;

  const { enrollments, progresses } = user;

  return {
    ...sanitizeUserPrivate(user),
    enrollments,
    progresses,
  };
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username, avatarUrl, bio } = (req as any).validated
      .body;

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        username,
        avatarUrl,
        bio,
      })
      .returning();

    res.status(201).json(sanitizeUserWithRelations(user));
  } catch (error: any) {
    console.error("Error creating user:", error);

    if (error?.code === "23505" || error?.message?.includes("unique")) {
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

    res.json(usersList.map((user) => sanitizeUserWithRelations(user)));
  } catch (error) {
    res.status(500).json({ error: "failed to fetch users" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username, avatarUrl, bio } = (req as any).validated
      .body;
    const { id } = req.params;
    const currentUser = (req as any).user;

    const targetUserId = Number(id);

    if (currentUser.role !== "ADMIN" && currentUser.id !== targetUserId) {
      return res
        .status(403)
        .json({ error: "forbidden: you can only update your own account" });
    }

    // Build update object with only provided fields
    const updateData: any = {};
    if (email !== undefined) updateData.email = email;
    if (username !== undefined) updateData.username = username;
    if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;
    if (bio !== undefined) updateData.bio = bio;

    // Hash password if provided
    if (password !== undefined) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const [user] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, targetUserId))
      .returning();

    res.json(sanitizeUserWithRelations(user));
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

    await db.delete(users).where(eq(users.id, targetUserId));

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

    res.json(sanitizeUserWithRelations(user));
  } catch (error) {
    res.status(500).json({ error: "failed to fetch user" });
  }
};
