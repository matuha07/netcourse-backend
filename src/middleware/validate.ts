import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      return res.status(400).json({
        error: "validation_error",
        issues: result.error.issues,
      });
    }

    (req as any).validated = result.data;

    next();
  };
};
