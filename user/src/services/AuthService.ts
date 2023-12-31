import httpStatus from "http-status";
import { IUser } from "../database/models/User";
import UserRepo from "../repository/UserRepo";
import { ApiError, isPasswordMatch, logger } from "../utils";
import { Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const COOKIE_EXPIRATION_DAYS = 90; // cookie expiration in days
const expirationDate = new Date(
    Date.now() + COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000
);
export const cookieOptions = {
    expires: expirationDate,
    secure: false,
    httpOnly: true,
};

/**
 * Signs a JSON Web Token (JWT) with the provided data.
 *
 * @param {string} email - The user's email.
 * @param {string} id - The user's id.
 * @param {string} role - The user's role.
 * @returns {string} The signed JWT token.
 * @throws {Error} If an error occurs during the token signing process.
 */
const signToken = (email: string, id: string, role: string) => {
    const token = jwt.sign({ email, id, role }, config.jwt.secret, {
        expiresIn: "1d",
    });
    return token;
};

const createSendToken = async (user: IUser, res: Response) => {
    const token = signToken(user.email, user._id, user.role);
    if (config.env === config.PROD) cookieOptions.secure = true;
    // @ts-ignore
    res.cookie("jwt", token, cookieOptions);

    return token;
};

/**
 * Log in a user
 *
 * @param {string} email
 * @param {string} password
 * @param {Response} res
 * @returns {Promise<IUser>}
 */
const login = async (email: string, password: string, res: Response) => {
    const user = await loginWithEmailAndPassword(email, password);
    const token = await createSendToken(user!, res);

    return {
        user,
        token,
    };
};

/**
 * Authenticates a user with the provided email and password
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<IUser | null, token>}
 */
const loginWithEmailAndPassword = async (email: string, password: string) => {
    const user = await UserRepo.getUserByEmailSync(email);

    if (!user || !(await isPasswordMatch(password, user.password as string))) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Incorrect email or password"
        );
    }

    return user;
};

export default {
    login,
};
