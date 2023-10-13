import { Channel } from "amqplib";
import config from "../config";
import { APIError } from "./apiErrors";
import { httpStatus } from "../../../shared";

const subscribeToMessage = async (channel: Channel) => {
    try {
        const appQueue = await channel.assertQueue(config.QUEUE_NAME);
        await channel.bindQueue(
            appQueue.queue,
            config.EXCHANGE_NAME,
            config.BINDING_KEY
        );
        await channel.consume(appQueue.queue, (message) => {
            if (message) {
                console.log(message.content.toString());
                channel.ack(message);
            }
        });
    } catch (error) {
        return new APIError(error.message, httpStatus.INTERNAL_SERVER_ERROR);
    }
};

export default { subscribeToMessage };
