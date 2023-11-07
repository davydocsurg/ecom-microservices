import amqp from "amqplib";
import config from "../config";
import logger from "./logger";
import ApiError from "./apiErrors";
import httpStatus from "http-status";

const connect = async () => {
    const connection = await amqp.connect(config.messageBrokerUrl);

    logger.info("Connected to RabbitMQ");
    return connection;
};

const createChannel = async () => {
    try {
        const connection = await connect();
        const channel = await connection.createChannel();
        return channel;
    } catch (error: any) {
        logger.error(error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
};

/**
 * Retry a publisher until it succeeds or reaches a maximum number of retries
 *
 * @param {Function} fn - The publisher to retry
 * @param {number} retries - The maximum number of retries
 * @param {number} delay - The delay between retries in milliseconds
 * @returns {Promise<any>} - The result of the publisher
 */
export const retry = async (
    fn: Function,
    retries: number,
    delay: number
): Promise<any> => {
    let attempts = 0;
    while (attempts < retries) {
        logger.info(`Attempt ${attempts + 1} of ${retries}`);
        try {
            const result = await fn();
            return result;
        } catch (error: any) {
            logger.error(`Error: ${error.message}`);
            attempts++;
            if (attempts === retries) {
                logger.error(`Failed after ${attempts} attempts`);
                throw new ApiError(
                    httpStatus.INTERNAL_SERVER_ERROR,
                    error.message
                );
            }
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
};

export default { connect, createChannel, retry };
