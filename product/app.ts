import express, { Express } from "express";
import { errorConverter, errorHandler } from "./middleware";
import { productRoute } from "./routes";

const app: Express = express();

// @ts-ignore
app.use(express.json());
// @ts-ignore
app.use(express.urlencoded({ extended: true }));

app.use(productRoute);
// @ts-ignore
app.use(errorConverter);
// @ts-ignore
app.use(errorHandler);

export default app;
