import { User } from "../database/models";
import { IUser } from "../database/models/User";
import { APIError } from "../utils";

/**
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @param {string} role
 * @returns {Promise<IUser>}
 */
const create = async (
    name: string,
    email: string,
    password: string,
    role: string
) => {
    if (await getUserByEmail(email)) {
        throw new APIError("Email already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        role,
    });

    return user;
};

/**
 * Get user by email
 *
 * @param {string} email
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<IUser, Key> | null>}
 */
const getUserByEmail = async <Key extends keyof IUser>(
    email: string,
    keys: (keyof IUser)[] = [
        "_id",
        "name",
        "email",
        "role",
        "resetToken",
        "resetTokenExpiration",
        "createdAt",
        "updatedAt",
    ]
): Promise<Pick<IUser, Key> | null> => {
    const user = await User.findOne({ email }).select(
        keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    );

    return user;
};

export default {
    create,
    getUserByEmail,
};
