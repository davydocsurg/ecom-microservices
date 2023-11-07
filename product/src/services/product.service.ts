import httpStatus from "http-status";
import { Product } from "../database";
import { ApiError } from "../utils";
import { IProduct } from "../database/models/Product";

/**
 * Create product
 *
 * @param {string} name
 * @param {string} description
 * @param {number} price
 * @param {boolean} inStock
 * @param {number} unit
 *
 * @returns {Promise<IProduct>}
 */
const create = async (
    name: string,
    description: string,
    price: number,
    inStock: boolean,
    unit: number
) => {
    const product = await Product.create({
        name,
        description,
        price,
        inStock,
        unit,
    });

    return product;
};

/**
 * Get product by slug
 *
 * @param {string} slug
 * @returns {Promise<IProduct>}
 */
const getProductBySlug = async (slug: string) => {
    const product = await Product.findOne({ slug });
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    }

    return product;
};

export default {
    create,
    getProductBySlug,
};
