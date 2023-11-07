import Joi from "joi";

const createProduct = {
    body: Joi.object().keys({
        name: Joi.string().required(),
    }),
};

export default {
    createProduct,
};
