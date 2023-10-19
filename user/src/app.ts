import express, { Express } from "express";
import cors from "cors";
import api from "./api";
import { errorConverter, errorHandler, xss } from "./api/middlewares";
import { Channel } from "amqplib";

const eApp = async (app: Express, channel: Channel) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(xss());
    api.user(app, channel);

    app.use(errorConverter);
    app.use(errorHandler);
};

export default eApp;
