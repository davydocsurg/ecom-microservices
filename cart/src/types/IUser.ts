import { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    resetToken: string;
    resetTokenExpiration: Date;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}
