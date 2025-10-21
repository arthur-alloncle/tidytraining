import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import { verifyAccessToken } from "../utils/jwt.js";

declare global {
  namespace Express {
    interface Request {
      user?: { userId: number };
    }
  }
}

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
    try {
        const auth = req.headers.authorization;
        if (!auth) throw ApiError.unauthorized('No authorization header');

        const parts = auth.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') throw ApiError.unauthorized('Invalid authorization format');

        const token = parts[1];
        const payload = verifyAccessToken(token);
        req.user = {userId: Number((payload as any).userId)};
        next();
    } catch (error) {
        next(error)
    }
}

