import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../types/api-response.js";

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response<ApiResponse<null>>,
  next: NextFunction
) => {
  console.error("💣 Error: ", err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: null,
      ...(err.details ? { details: err.details } : {}),
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
    data: null,
  });
};
