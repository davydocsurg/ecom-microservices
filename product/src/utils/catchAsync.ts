import { IUser } from "../types";
import { RequestHandler } from "express";
import { Request, Response, NextFunction } from "express-serve-static-core";

declare module "express-serve-static-core" {
    interface Request {
        user: IUser;
    }
}

export interface CustomParamsDictionary {
    [key: string]: any;
}

const catchAsync = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next)?.catch(next);
    };
};

export default catchAsync;
