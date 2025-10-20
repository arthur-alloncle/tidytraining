import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import { z, ZodError } from "zod";

export const validate =
  (schema: z.ZodObject<any, any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details = error.issues.map((e: any) => ({
          path: e.path.join('.'),
          message: e.message,
        }));
        return next(ApiError.badRequest('❌ Validation error', details));
      }

      return next(error);
    }
  };