import express from "express";
import UserController from "../controllers/UserController";
import { validate } from "../api/middlewares";
import { userValidation } from "../api/validations";

const userRouter = express.Router();
//  async (app: Express, channel: Channel) => {
//     await userUtils.subscribeToMessage(channel);

// app.post(
//     "/signup",
//     validate(userValidation.createUser),
//     UserController.signup
// );

// app.post(
//     "/login",
//     validate(userValidation.loginUser),
//     UserController.login
// );
// };

userRouter.post(
    "/signup",
    validate(userValidation.createUser),
    UserController.signup
);

userRouter.post(
    "/login",
    validate(userValidation.loginUser),
    UserController.login
);

export default userRouter;
