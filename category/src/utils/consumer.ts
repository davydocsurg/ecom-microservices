import config from "../config";
import rabbitmq from "./rabbitmq";

const consumeUserInfoResponse = async () => {
    const channel = await rabbitmq.createChannel();
    channel.assertQueue(config.userInfoResponseQueue);

    channel.consume(config.userInfoResponseQueue, (message) => {
        if (message) {
            console.log(message.content.toString() + "user");
            const userData = JSON.parse(message.content.toString());
            channel.ack(message);
        }
    });
};

export { consumeUserInfoResponse };
