import express from "express";
import { connectDB } from "./database/connection";
import { logger, userUtils } from "./utils";
import eApp from "./app";
import { Channel } from "amqplib";
import config from "./config";
import { Server } from "http";

let server: Server;
const app = express();

const setup = async () => {
    await connectDB();

    const channel = await userUtils.createChannel();

    await eApp(app, channel as Channel);
};

setup();

server = app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info("Server closed");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: unknown) => {
    logger.error(error);
    exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
