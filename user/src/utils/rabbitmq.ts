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

export default { connect, createChannel };
