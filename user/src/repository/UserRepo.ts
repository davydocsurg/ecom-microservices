import { User } from "../database/models";
import { IUser } from "../database/models/User";

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
    getUserByEmail,
};
