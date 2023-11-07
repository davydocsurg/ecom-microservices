import { RequestHandler, Request, Response, NextFunction } from "express";
import { IUser } from "../types";

declare module "express-serve-static-core" {
    interface Request {
        user: IUser;
    }
}

export interface CustomParamsDictionary {
    [key: string]: any;
}

const catchAsync = (
    fn: RequestHandler<
        CustomParamsDictionary,
        any,
        any,
        qs.ParsedQs,
        Record<string, any>
    >
) => {
    return (
        req: Request<
            CustomParamsDictionary,
            any,
            any,
            any,
            Record<string, any>
        >,
        res: Response<any>,
        next: NextFunction
    ) => {
        // @ts-ignore
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
};

export default catchAsync;
