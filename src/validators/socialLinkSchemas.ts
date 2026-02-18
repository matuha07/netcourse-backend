import { z } from "zod";

const socialPlatformEnum = z.enum([
  "github",
  "twitter",
  "youtube",
  "website",
  "other",
]);

export const createSocialLinkSchema = z.object({
  body: z.object({
    platform: socialPlatformEnum,
    url: z.url(),
  }),
});

export type CreateSocialLinkInput = z.infer<typeof createSocialLinkSchema>["body"];

export const updateSocialLinkSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    platform: socialPlatformEnum.optional(),
    url: z.url().optional(),
  }),
});

export type UpdateSocialLinkInput = z.infer<typeof updateSocialLinkSchema>["body"];