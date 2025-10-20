import { Request, Response, NextFunction } from "express";
import { User } from "../entity/user.entity.js";
import { ApiResponse } from "../types/api-response.js";
export declare const createUser: (req: Request, res: Response<ApiResponse<User>>, next: NextFunction) => Promise<void>;
export declare const findUserById: (req: Request, res: Response<ApiResponse<User>>, next: NextFunction) => Promise<void>;
