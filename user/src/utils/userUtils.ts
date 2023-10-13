import { Channel, connect } from "amqplib";
import config from "../config";
import { APIError } from "./apiErrors";
import httpStatus from "http-status";

const createChannel = async () => {
    try {
        const connection = await connect(config.messageBrokerUrl);
        const channel = await connection.createChannel();
        await channel.assertExchange(config.EXCHANGE_NAME, "direct", {
            durable: true,
        });
        return channel;
    } catch (error: any) {
        return new APIError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
};

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
    } catch (error: any) {
        return new APIError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
};

export default { createChannel, subscribeToMessage };
