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

const catchAsync =
  (fn: RequestHandler<CustomParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>) =>
  (
    // @ts-ignore
    req: Request<CustomParamsDictionary, any, any, any, Record<string, any>>,
    // @ts-ignore
    res: Response<any, Record<string, any>, number>,
    next: NextFunction
  ) => {
    // @ts-ignore
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };

export default catchAsync;
