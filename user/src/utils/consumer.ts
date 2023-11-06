import httpStatus from "http-status";
import config from "../config";
import ApiError from "./apiErrors";
import rabbitmq from "./rabbitmq";
import logger from "./logger";
import { User } from "../database/models";

const consumeUserRegistration = async () => {
    try {
        logger.info("Consuming user registration messages...");
        const channel = await rabbitmq.createChannel();
        channel.assertQueue(config.userRegistrationQueue);

        channel.consume(config.userRegistrationQueue, (message) => {
            if (message) {
                console.log(message.content.toString() + "user");
                channel.ack(message);
            }
        });
        logger.info("Consumed user registration messages");
    } catch (error: any) {
        console.log(error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
};

const consumeUserInfoRequest = async () => {
    try {
        logger.info("Consuming user info request messages...");
        const channel = await rabbitmq.createChannel();
        channel.assertQueue(config.userInfoRequestQueue);

        channel.consume(config.userInfoRequestQueue, async (message) => {
            if (message) {
                console.log(message.content.toString() + "user");
                const user = await User.findOne({
                    email: message.content.toString(),
                });

                logger.warn(message.properties.replyTo);

                channel.sendToQueue(
                    config.userInfoResponseQueue,
                    Buffer.from(JSON.stringify(user)),
                    {
                        correlationId: message.properties.correlationId,
                    }
                );
                channel.ack(message);
            }
        });
    } catch (error: any) {
        console.log(error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
};

export { consumeUserRegistration, consumeUserInfoRequest };
