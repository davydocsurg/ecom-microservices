import httpStatus from "http-status";
import { Category } from "../database";
import { ApiError, logger, rabbitmq } from "../utils";
import { ICategory } from "../database/models/Category";
import config from "../config";

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

    await rabbitmq.retry(
        async () => await publishCategoryCreation(category),
        config.rabbitmq.retryLimit,
        config.rabbitmq.retryDelay
    );

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

/**
 * Publish category creation message
 * @param {ICategory} category
 * @returns {Promise<void>}
 */
const publishCategoryCreation = async (category: ICategory) => {
    // let retries = config.rabbitmq.retryLimit;
    // while (retries > 0) {
    try {
        const channel = await rabbitmq.createChannel();
        await channel.assertQueue(config.categoryQueue);
        channel.sendToQueue(
            config.categoryQueue,
            Buffer.from(JSON.stringify(category))
        );
        return;
    } catch (error: any) {
        logger.error(`Error publishing category creation: ${error.message}`);
        // retries--;
        // if (retries === 0) {
        //     logger.error(
        //         `Failed to publish category creation after 3 attempts`
        //     );
        // }
    }
    // }
};

export default {
    create,
    getCategoryByName,
    publishCategoryCreation,
};
