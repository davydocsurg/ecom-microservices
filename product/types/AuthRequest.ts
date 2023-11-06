import { Request } from "express";

export interface AuthRequest extends Request {
    user: IUser;
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    resetToken?: string;
    resetTokenExpiration?: Date;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}
