import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import { logger } from "../utils";
import { ApiError } from "../utils";
import { config as envConf } from "dotenv";

envConf();

// @ts-ignore
export const errorConverter: ErrorRequestHandler = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode ||
            (error instanceof Error
                ? httpStatus.BAD_REQUEST
                : httpStatus.INTERNAL_SERVER_ERROR);
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, false, err.stack.toString());
    }
    next(error);
};

// @ts-ignore
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    if (process.env.NODE_ENV === "production" && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    };

    if (process.env.NODE_ENV === "development") {
        logger.error(err);
    }

    res.status(statusCode).json(response);
    next();
};
