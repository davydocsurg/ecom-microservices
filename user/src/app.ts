import express, { Express } from "express";
import cors from "cors";
import { errorConverter, errorHandler, xss } from "./api/middlewares";
import userRouter from "./routes";
import { consumeUserRegistration } from "./utils";
import { userSeeder } from "./database/seeders";

const app: Express = express();

// @ts-ignore
app.use(express.json());
// @ts-ignore
app.use(express.urlencoded({ extended: true }));

// @ts-ignore
app.use(cors());

// @ts-ignore
app.use(xss());

// seed data
userSeeder.seedAdmin();

// consumeUserRegistration();

app.use("/api", userRouter);

// @ts-ignore
app.use(errorConverter);
// @ts-ignore
app.use(errorHandler);

export default app;
