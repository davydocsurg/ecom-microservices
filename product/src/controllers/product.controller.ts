import httpStatus from "http-status";
import { Request, Response } from "express";
import { productService } from "../services";
import {
    catchAsync,
    consumeCategoryResponse,
    logger,
    rabbitmq,
} from "../utils";
import config from "../config";

// @ts-ignore
const create = catchAsync(async (req, res) => {
    const { name, description, price, category, unit } = req.body;

    const product = await productService.create(
        name,
        description,
        price,
        category,
        unit
    );
    return res.status(httpStatus.CREATED).send({ product });
});

// @ts-ignore
const getCategories = async (req: Request, res: Response) => {
    await rabbitmq.retry(
        async () => await consumeCategoryResponse(res),
        config.rabbitmq.retryLimit,
        config.rabbitmq.retryDelay
    );
};

export default {
    create,
    getCategories,
};
