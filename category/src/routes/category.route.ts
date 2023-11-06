import express from "express";
import { authMiddleware, validate } from "../middleware";
import { categoryController } from "../controllers";
import { categoryValidation } from "../middleware/validations";

const categoryRoute = express.Router();

// @ts-ignore
categoryRoute.post(
    "/create",
    [authMiddleware as any, validate(categoryValidation.createCategory)],
    categoryController.create
);

export default categoryRoute;
