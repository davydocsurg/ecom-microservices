import httpStatus from "http-status";
import { Category } from "../database";
import { ApiError } from "../utils";

/**
 * Create category
 *
 * @param {string} name
 * @returns {Promise<ICategory>}
 */
const create = async (name: string) => {
    if (await Category.findOne({ name })) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Category already exists");
    }
    const category = await Category.create({ name });

    return category;
};

/**
 * Get category by name
 *
 * @param {string} name
 * @returns {Promise<ICategory>}
 */
const getCategoryByName = async (name: string) => {
    const category = await Category.findOne({ name });
    if (!category) {
        throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
    }

    return category;
};

export default {
    create,
    getCategoryByName,
};
