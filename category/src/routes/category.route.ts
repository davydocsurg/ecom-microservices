import express from "express";
import { authMiddleware } from "../middleware";
import { categoryController } from "../controllers";

const categoryRoute = express.Router();

// @ts-ignore
categoryRoute.post("/create", authMiddleware, categoryController.create);

export default categoryRoute;
