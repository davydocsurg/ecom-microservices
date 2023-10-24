import httpStatus from "http-status";
import { catchAsync, logger } from "../utils";
import categoryService from "../services/category.service";

// @ts-ignore
const create = catchAsync(async (req, res) => {
    logger.info(req.sub);
    res.status(httpStatus.CREATED).send(req.sub);
    // const category = await categoryService.create(req.body.name);
    // res.status(httpStatus.CREATED).send(category);
});

export default {
    create,
};
