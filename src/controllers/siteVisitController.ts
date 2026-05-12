import { Request, Response } from "express";
import { eq, sql } from "drizzle-orm";
import { db } from "../drizzle/db";
import { siteVisits } from "../drizzle/schema";

const ensureSiteVisitRow = async () => {
  await db.execute(
    sql`INSERT INTO "site_visits" ("id", "count") VALUES (1, 0)
    ON CONFLICT ("id") DO NOTHING`,
  );
};

export const getSiteVisits = async (_req: Request, res: Response) => {
  try {
    await ensureSiteVisitRow();

    const [visit] = await db
      .select({ count: siteVisits.count, updatedAt: siteVisits.updatedAt })
      .from(siteVisits)
      .where(eq(siteVisits.id, 1));

    res.json({
      count: visit?.count ?? 0,
      updatedAt: visit?.updatedAt ?? null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch site visits" });
  }
};

export const incrementSiteVisits = async (_req: Request, res: Response) => {
  try {
    await ensureSiteVisitRow();

    const [visit] = await db
      .update(siteVisits)
      .set({
        count: sql<number>`"count" + 1`,
        updatedAt: sql`CURRENT_TIMESTAMP`,
      })
      .where(eq(siteVisits.id, 1))
      .returning({ count: siteVisits.count, updatedAt: siteVisits.updatedAt });

    res.json({
      count: visit?.count ?? 0,
      updatedAt: visit?.updatedAt ?? null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to increment site visits" });
  }
};
