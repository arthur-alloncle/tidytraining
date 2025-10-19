import { ApiError } from "../utils/ApiError.js";
export const errorHandler = (err, req, res, next) => {
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
