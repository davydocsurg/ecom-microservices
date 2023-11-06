import bcrypt from "bcryptjs";

export const encryptPassword = async (password: string) => {
    const encryptedPassword = await bcrypt.hash(password, 12);
    return encryptedPassword;
};

export const isPasswordMatch = async (
    password: string,
    userPassword: string
) => {
    const result = await bcrypt.compare(password, userPassword);
    return result;
};
