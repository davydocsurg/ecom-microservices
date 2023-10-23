import { IUser } from "../database/models/User";

declare module "express-serve-static-core" {
    interface Request {
        user: IUser;
    }
}
