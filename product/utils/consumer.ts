import config from "../config";
import rabbitmq from "./rabbitmq";

const consumeCategoryResponse = async () => {
    const channel = await rabbitmq.createChannel();
    channel.assertQueue(config.categoryQueue);

    channel.consume(config.categoryQueue, (message) => {
        if (message) {
            console.log(message.content.toString() + "category");
            const categories = JSON.parse(message.content.toString());
            channel.ack(message);
            return categories;
        }
    });
};

export { consumeCategoryResponse };
