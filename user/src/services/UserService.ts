import httpStatus from "http-status";
import { User } from "../database/models";
import UserRepo from "../repository/UserRepo";
import { ApiError, encryptPassword, exclude, logger, rabbitmq } from "../utils";
import config from "../config";

/**
 * Create user
 *
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @param {string} role
 * @returns {Promise<Pick<IUser, Key>>}
 */
const create = async (
    name: string,
    email: string,
    password: string,
    role?: string
) => {
    if (await UserRepo.getUserByEmail(email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists");
    }

    const user = await User.create({
        name,
        email,
        password: await encryptPassword(password),
    });

    await processUser();

    const userWithoutPassword = {
        name: user.name,
        email: user.email,
        role: user.role,
    };

    return userWithoutPassword;
};

/**
 * Process user
 * @returns {Promise<void>}
 */
const processUser = async () => {
    try {
        const channel = await rabbitmq.createChannel();
        const userQueue = await channel.assertQueue(config.QUEUE_NAME, {
            durable: true,
        });
        await channel.bindQueue(
            userQueue.queue,
            config.EXCHANGE_NAME,
            config.BINDING_KEY
        );
        await channel.consume(userQueue.queue, (message) => {
            if (message) {
                console.log(message.content.toString());
                channel.ack(message);
            }
        });
    } catch (error: any) {
        logger.error(error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
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
    processUser,
};
