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
