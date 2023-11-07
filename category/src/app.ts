import express, { Express } from "express";
import { authMiddleware, errorConverter, errorHandler } from "./middleware";
import { categoryRoute } from "./routes";

const app: Express = express();

// @ts-ignore
app.use(express.json());
// @ts-ignore
app.use(express.urlencoded({ extended: true }));

app.use(categoryRoute);
// @ts-ignore
app.use(errorConverter);
// @ts-ignore
app.use(errorHandler);

export default app;
