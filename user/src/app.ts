import express, { Express } from "express";
import cors from "cors";
import api from "./api";
import { errorConverter, errorHandler } from "./api/middlewares";
import { Channel } from "amqplib";

const eApp = async (app: Express, channel: Channel) => {
    app.use(express.json({ limit: "1mb" }));
    app.use(express.urlencoded({ extended: true, limit: "1mb" }));
    app.use(cors());
    app.use(express.static(__dirname + "/public"));

    api.user(app, channel);

    app.use(errorConverter);

    app.use(errorHandler);
};

export default eApp;
