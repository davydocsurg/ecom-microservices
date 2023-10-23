import express from "express";
import cors from "cors";
import { errorConverter, errorHandler, xss } from "./api/middlewares";
import userRouter from "./routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(xss());
app.use("/api", userRouter);
app.use(errorConverter);
app.use(errorHandler);

export default app;
