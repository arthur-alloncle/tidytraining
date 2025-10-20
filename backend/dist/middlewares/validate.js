import { ApiError } from "../utils/ApiError.js";
import { ZodError } from "zod";
export const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (error) {
        if (error instanceof ZodError) {
            error.issues.map;
            const details = error.issues.map((e) => ({
                path: e.path.join('.'),
                message: e.message,
            }));
            return next(ApiError.badRequest('Validation error', details));
        }
        return next(error);
    }
};
