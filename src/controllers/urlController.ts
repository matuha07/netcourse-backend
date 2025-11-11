import { request, Request, Response } from "express";
import prisma from "../prisma";
import { nanoid } from "nanoid";

export const urlShort = async (req: Request, res: Response) => {
  const { url } = req.body;
  const short = nanoid(6);
  const existing = await prisma.links.findFirst({
    where: { original_url: url },
  });

  if (existing) {
    return res.json({
      short_url: `${req.protocol}://${req.hostname}/${existing.short_url}`,
      original_url: url,
    });
  }

  const created = await prisma.links.create({
    data: {
      short_url: short,
      original_url: url,
    },
  });

  return res.json({
    short_url: `${req.protocol}://${req.hostname}/${created.short_url}`,
    original_url: url,
  });
};

export const urlRedirect = async (req: Request, res: Response) => {
  const { short } = req.params;

  const link = await prisma.links.findUnique({
    where: { short_url: short },
    select: { original_url: true },
  });

  if (!link) return res.status(404).send("Not found");

  await prisma.links.update({
    where: { short_url: short },
    data: { hits: { increment: 1 } },
  });

  res.redirect(link.original_url);
};
