import { Cart } from "../database";

/**
 * Create cart
 *
 * @param {string} userId
 * @returns {Promise<ICart>}
 */
const create = async (userId: string) => {
    const cart = await Cart.create({ userId, items: [] });

    return cart;
};

export default {
    create,
};
