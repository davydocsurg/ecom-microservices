import express from "express";
import { authMiddleware, validate } from "../middleware";
import { productController } from "../controllers";
import { productValidation } from "../middleware/validations";
import { catchAsync } from "../utils";

const productRoute = express.Router();

// @ts-ignore
productRoute.post(
    "/create",
    [authMiddleware as any, validate(productValidation.createProduct)],
    productController.create
);

productRoute.get(
    "/category/all",
    authMiddleware as any,
    // @ts-ignore
    catchAsync(productController.getCategories)
);

export default productRoute;
