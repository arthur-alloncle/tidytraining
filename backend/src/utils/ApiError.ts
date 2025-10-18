export class ApiError extends Error {
    public statusCode: number;
    public details?: any;

    constructor(statusCode: number, message: string, details?:any) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;

        // Keep naming in stacktrace
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    static badRequest(message= 'bad request', details?: any) {
        return new ApiError(400, message, details)
    }

    static unauthorized(message= 'Unauthorized') {
        return new ApiError(401, message)
    }

    static forbidden(message= 'Forbidden') {
        return new ApiError(403, message)
    }

    static notFound(message= 'Not found') {
        return new ApiError(404, message)
    }

    static internal(message= 'Internal server error', details?: any) {
        return new ApiError(500, message, details)
    }
}