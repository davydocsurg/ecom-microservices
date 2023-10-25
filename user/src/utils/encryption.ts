import bcrypt from "bcryptjs";
import logger from "./logger";

export const encryptPassword = async (password: string) => {
    const encryptedPassword = await bcrypt.hash(password, 12);
    return encryptedPassword;
};

export const isPasswordMatch = async (
    password: string,
    userPassword: string
) => {
    const result = await bcrypt.compare(password, userPassword);
    logger.info(`Password match: ${result}`);
    return result;
};
