import { Request } from "express";
import { Document } from "mongoose";

export interface AuthRequest extends Request {
    // _id: string;
    user: IUser;
}

export interface IUser extends Document {
    // _id: string;
    name: string;
    email: string;
    password: string;
    resetToken: string;
    resetTokenExpiration: Date;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}
