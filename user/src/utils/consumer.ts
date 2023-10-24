import httpStatus from "http-status";
import config from "../config";
import ApiError from "./apiErrors";
import rabbitmq from "./rabbitmq";
import logger from "./logger";

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

export { consumeUserRegistration };
