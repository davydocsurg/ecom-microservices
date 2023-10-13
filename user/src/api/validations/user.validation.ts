import Joi from "joi";
import { password } from "./custom.validation";

const createUser = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        name: Joi.string().required(),
    }),
};

export default {
    createUser,
};
