import express from "express";
import UserController from "../controllers/UserController";
import { validate } from "../api/middlewares";
import { userValidation } from "../api/validations";

const userRouter = express.Router();

userRouter.post(
    "/signup",
    // @ts-ignore
    validate(userValidation.createUser),
    UserController.signup
);

userRouter.post(
    "/login",
    // @ts-ignore
    validate(userValidation.loginUser),
    UserController.login
);

export default userRouter;
