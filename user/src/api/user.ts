import { Express } from "express";
import { Channel } from "amqplib";
import { userUtils } from "../utils";
import UserController from "../controllers/UserController";
import { validate } from "./middlewares";
import { userValidation } from "./validations";

export const user = async (app: Express, channel: Channel) => {
    await userUtils.subscribeToMessage(channel);

    app.post(
        "/signup",
        validate(userValidation.createUser),
        UserController.signup
    );
};
