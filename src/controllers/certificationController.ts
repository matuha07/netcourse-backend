import { Request, Response } from "express";
const PDFDocument = require("pdfkit");
import { db } from "../drizzle/db";
import { certifications, users, courses } from "../drizzle/schema";
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

export const getCertificatePdf = async (req: Request, res: Response) => {
  try {
    const code = String(req.params.code);

    const cert = await db.query.certifications.findFirst({
      where: eq(certifications.certificateCode, code),
    });

    if (!cert) {
      return res.status(404).json({ error: "Certificate not found" });
    }

    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, cert.userId),
    });

    const course = await db.query.courses.findFirst({
      where: (courses, { eq }) => eq(courses.id, cert.courseId),
    });

    if (!user || !course) {
      return res.status(404).json({ error: "User or course not found" });
    }

    const issuedOn = cert.issuedAt
      ? new Date(cert.issuedAt).toISOString().slice(0, 10)
      : "N/A";
    const username = user.username || "Student";

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="certificate-${cert.certificateCode}.pdf"`,
    );

    const doc = new PDFDocument({ size: "A4", margin: 50, bufferPages: true });

    doc.on("error", (err: Error) => {
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to generate certificate PDF" });
      }
    });

    doc.pipe(res);

    const darkBg = "#0f172a";
    const lightText = "#f1f5f9";
    const emeraldAccent = "#10b981";
    const emeraldLight = "#34d399";

    doc.rect(0, 0, doc.page.width, doc.page.height).fill(darkBg);
    doc.rect(50, 50, doc.page.width - 100, 3).fill(emeraldAccent);

    doc
      .strokeColor(emeraldAccent)
      .lineWidth(2)
      .opacity(0.3)
      .rect(50, 65, doc.page.width - 100, doc.page.height - 130)
      .stroke();
    doc.opacity(1);

    const mx = 50;

    doc
      .fontSize(36)
      .font("Helvetica-Bold")
      .fillColor(emeraldLight)
      .text("Certificate of Completion", mx, 120, { align: "center" });

    doc
      .strokeColor(emeraldAccent)
      .lineWidth(1)
      .opacity(0.5)
      .moveTo(150, 180)
      .lineTo(doc.page.width - 150, 180)
      .stroke();
    doc.opacity(1);

    doc
      .fontSize(14)
      .font("Helvetica")
      .fillColor(lightText)
      .text("This certifies that", mx, 210, { align: "center" });

    doc
      .fontSize(28)
      .font("Helvetica-Bold")
      .fillColor(emeraldAccent)
      .text(username, mx, 260, { align: "center" });

    doc
      .fontSize(14)
      .font("Helvetica")
      .fillColor(lightText)
      .text("has successfully completed the course", mx, 320, {
        align: "center",
      });

    doc
      .fontSize(16)
      .font("Helvetica-Bold")
      .fillColor(emeraldLight)
      .text(`"${course.title}"`, mx, 350, { align: "center" });

    doc
      .strokeColor(emeraldAccent)
      .lineWidth(1)
      .opacity(0.5)
      .moveTo(150, 420)
      .lineTo(doc.page.width - 150, 420)
      .stroke();
    doc.opacity(1);

    doc
      .fontSize(11)
      .font("Helvetica")
      .fillColor(lightText)
      .text(`Issued on ${issuedOn}`, mx, 450, { align: "center" });

    doc
      .fontSize(9)
      .font("Helvetica")
      .fillColor(emeraldAccent)
      .opacity(0.7)
      .text(`Certificate Code: ${cert.certificateCode}`, mx, 700, {
        align: "center",
      });

    doc.opacity(1);
    doc.end();
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to generate certificate PDF" });
    }
  }
};
