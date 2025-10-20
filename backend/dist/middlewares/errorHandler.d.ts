import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../types/api-response.js";
export declare const errorHandler: (err: Error | ApiError, req: Request, res: Response<ApiResponse<null>>, next: NextFunction) => Response<ApiResponse<null>, Record<string, any>>;
