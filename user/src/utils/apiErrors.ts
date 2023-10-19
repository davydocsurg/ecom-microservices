import httpStatus from "http-status";

class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    errorStack: string;
    errorResponse: boolean;

    constructor(
        statusCode: number,
        message: string | undefined,
        isOperational: boolean,
        errorStack: string,
        errorResponse: boolean
    ) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.errorStack = errorStack;
        this.errorResponse = errorResponse;
        Error.captureStackTrace(this);
    }
}

class APIError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(
        statusCode: number,
        message: string | undefined,
        isOperational = true,
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

class NotFoundError extends AppError {
    constructor(
        statusCode: number = httpStatus.NOT_FOUND,
        message = "Not Found",
        isOperational: boolean = true,
        errorStack: string = "",
        errorResponse: boolean = true
    ) {
        super(statusCode, message, isOperational, errorStack, errorResponse);
    }
}

export { APIError, NotFoundError };
