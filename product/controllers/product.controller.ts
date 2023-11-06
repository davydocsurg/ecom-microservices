import httpStatus from "http-status";
import { productService } from "../services";
import { catchAsync } from "../utils";

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
