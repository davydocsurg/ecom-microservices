import httpStatus from "http-status";
import { User } from "../database/models";
import UserRepo from "../repository/UserRepo";
import { APIError, logger } from "../utils";

/**
 * Create user
 *
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
    if (await UserRepo.getUserByEmail(email)) {
        throw new APIError(httpStatus.BAD_REQUEST, "Email already exists");
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
 * Subscribe to events
 *
 * @param {EventEmitter} payload
 * @returns {Promise<void>}
 */
const subscribe = async (payload: any) => {
    payload = JSON.parse(payload);
    logger.info(`Received event ${payload.event} from ${payload.service}`);
    const { event, data } = payload;

    const { userId, product, order, qty } = data;

    // switch (event) {
    //   case "ADD_TO_WISHLIST":
    //   case "REMOVE_FROM_WISHLIST":
    //     this.AddToWishlist(userId, product);
    //     break;
    //   case "ADD_TO_CART":
    //     this.ManageCart(userId, product, qty, false);
    //     break;
    //   case "REMOVE_FROM_CART":
    //     this.ManageCart(userId, product, qty, true);
    //     break;
    //   case "CREATE_ORDER":
    //     this.ManageOrder(userId, order);
    //     break;
    //   default:
    //     break;
    // }
};
export default {
    create,
    subscribe,
};
