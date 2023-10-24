import config from "../config";
import { cartService } from "../services";
import { rabbitmq } from "../utils";
import logger from "../utils/logger";

const handleUserRegistrationEvent = async () => {
    logger.info("Listening for user registration events");
    const channel = await rabbitmq.createChannel();
    const queue = await channel.assertQueue(config.userRegistrationQueue);

    channel.consume(queue.queue, (msg) => {
        if (msg) {
            const userData = JSON.parse(msg.content.toString());
            logger.info(
                `Received user registration event for user ${userData.email}`
            );
            // Create a cart for the new user
            cartService.create(userData.id);
            // Acknowledge the message
            channel.ack(msg);
        }
    });
};

export { handleUserRegistrationEvent };
