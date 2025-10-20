import { Request, Response, NextFunction } from "express";
import { z } from "zod";
export declare const validate: (schema: z.ZodObject<any, any>) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
