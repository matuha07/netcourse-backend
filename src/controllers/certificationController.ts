import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { certifications } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const getMyCertifications = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const certs = await db.query.certifications.findMany({
      where: eq(certifications.userId, userId),
      with: { course: true },
    });

    res.json(certs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch certifications" });
  }
};

export const getUserCertifications = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const certs = await db.query.certifications.findMany({
      where: eq(certifications.userId, Number(userId)),
      with: { course: true },
    });

    res.json(certs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch certifications" });
  }
};

export const verifyCertificate = async (req: Request, res: Response) => {
  try {
    const code = String(req.params.code);

    const cert = await db.query.certifications.findFirst({
      where: eq(certifications.certificateCode, code),
      with: { user: true, course: true },
    });

    if (!cert) {
      return res.status(404).json({ error: "Certificate not found" });
    }

    res.json({
      valid: true,
      certificateCode: cert.certificateCode,
      issuedAt: cert.issuedAt,
      user: {
        username: cert.user.username,
        avatarUrl: cert.user.avatarUrl,
      },
      course: {
        title: cert.course.title,
        category: cert.course.category,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to verify certificate" });
  }
};