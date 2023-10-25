import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError, logger } from "../utils";
import { AuthRequest } from "../types";
import config from "../config";
import httpStatus from "http-status";

interface TokenPayload {
    _id: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
}

const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    // let token: string | undefined;
    // // check if token is set
    // if (
    //     // @ts-ignore
    //     req.headers.authorization &&
    //     // @ts-ignore
    //     req.headers.authorization.startsWith("Bearer")
    // ) {
    //     // @ts-ignore
    //     [, token] = req.headers.authorization.split(" ");
    // }

    // if (!token) {
    //     return next(
    //         new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized. Please login")
    //     );
    // }
    // @ts-ignore
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(
            new ApiError(
                httpStatus.UNAUTHORIZED,
                "Missing authorization header"
            )
        );
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = jwt.verify(token, config.jwt.secret) as TokenPayload;
        if (decoded.role !== "admin") {
            return next(
                new ApiError(
                    httpStatus.UNAUTHORIZED,
                    "Unauthorized. Only admins can create categories."
                )
            );
        }
        req.user.email = decoded.email;
        req.user.role = decoded.role;
        req.user._id = decoded._id;
        next();
    } catch (error) {
        logger.error(error);
        return next(new ApiError(httpStatus.UNAUTHORIZED, "Invalid token"));
    }

    return next();
};

export default authMiddleware;
