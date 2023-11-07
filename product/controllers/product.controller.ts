import httpStatus from "http-status";
import { productService } from "../services";
import { catchAsync, consumeCategoryResponse, rabbitmq } from "../utils";
import config from "../config";

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

const getCategories = catchAsync(async (req, res) => {
    const categories = await rabbitmq.retry(
        async () => await consumeCategoryResponse(),
        config.rabbitmq.retryLimit,
        config.rabbitmq.retryDelay
    );
    return res.status(httpStatus.OK).send({ categories });
});

export default {
    create,
    getCategories,
};
