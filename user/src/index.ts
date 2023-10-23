import express from "express";
import { connectDB } from "./database/connection";
import config from "./config";
import { Server } from "http";
import app from "./app";
import { logger } from "./utils";

let server: Server;
connectDB();

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
