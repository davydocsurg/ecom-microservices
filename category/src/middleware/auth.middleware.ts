import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError, logger } from "../utils";
import { AuthRequest } from "../types";
import config from "../config";
import httpStatus from "http-status";

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

    let payload: any;
    // verify token
    try {
        payload = jwt.verify(token, config.jwt.secret);
        // Logging.info(payload);
        next();
    } catch (error) {
        logger.error(error);
        return next(new ApiError(httpStatus.UNAUTHORIZED, "Invalid token"));
    }
    // Verify the JWT token and extract user information
    const decoded = jwt.verify(token, config.jwt.secret);
    // check if user's password is still thesame since token issue
    // const passwordChanged = await currentUser.changedPasswordAfter(payload.iat);
    // Logging.error(passwordChanged);
    // if (passwordChanged) {
    //     return next(
    //         new ApiError(
    //             "User recently changed password. Please, login again",
    //             401
    //         )
    //     );
    // }

    logger.info(decoded);

    // grant access
    // req.user = currentUser;
    return next();
};

export default authMiddleware;
