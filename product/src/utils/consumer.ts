import { Response } from "express";
import httpStatus from "http-status";
import config from "../config";
import rabbitmq from "./rabbitmq";

const consumeCategoryResponse = async (res: Response) => {
    const channel = await rabbitmq.createChannel();
    channel.assertQueue(config.categoryQueue);

    channel.consume(config.categoryQueue, (message) => {
        if (message) {
            const categories = JSON.parse(message.content.toString());
            // @ts-ignore
            res.status(httpStatus.OK).send({ categories });
            // channel.ack(message);
        }
    });
};

export { consumeCategoryResponse };
