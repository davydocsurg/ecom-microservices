import { httpStatus } from "../../../shared";

class AppError extends Error {
    name: string;
    statusCode: number;
    description: string;
    isOperational: boolean;
    errorStack: string;
    errorResponse: boolean;

    constructor(
        name: string,
        statusCode: number,
        description: string,
        isOperational: boolean,
        errorStack: string,
        errorResponse: boolean
    ) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.errorStack = errorStack;
        this.errorResponse = errorResponse;
        Error.captureStackTrace(this);
    }
}

class APIError extends AppError {
    constructor(
        name: string,
        statusCode: number = httpStatus.INTERNAL_SERVER_ERROR,
        description: string = "Internal Server Error",
        isOperational: boolean = true
    ) {
        super(name, statusCode, description, isOperational, "", true);
    }
}

class NotFoundError extends AppError {
    constructor(
        name: string = "NOT FOUND",
        statusCode: number = httpStatus.NOT_FOUND,
        description = "Not Found",
        isOperational: boolean = true,
        errorStack: string = "",
        errorResponse: boolean = true
    ) {
        super(
            name,
            statusCode,
            description,
            isOperational,
            errorStack,
            errorResponse
        );
    }
}

export { APIError, NotFoundError };
