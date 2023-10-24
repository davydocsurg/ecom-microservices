import express, { Express } from "express";
import {
    errorConverter,
    errorHandler,
    handleUserRegistrationEvent,
} from "./middleware";

const app: Express = express();

// @ts-ignore
app.use(express.json());
// @ts-ignore
app.use(express.urlencoded({ extended: true }));

handleUserRegistrationEvent();

// @ts-ignore
app.use(errorConverter);
// @ts-ignore
app.use(errorHandler);

export default app;
