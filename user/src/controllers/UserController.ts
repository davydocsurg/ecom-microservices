import httpStatus from "http-status";
import UserService from "../services/UserService";
import { catchAsync } from "../utils";
import { AuthService } from "../services";

// @ts-ignore
const signup = catchAsync(async (req, res) => {
    const { name, email, password } = req.body;

    const user = await UserService.create(name, email, password);
    return res.status(httpStatus.CREATED).send({ user });
});

// @ts-ignore
const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    const loginRes = await AuthService.login(email, password, res);
    return res.status(httpStatus.OK).send(loginRes);
});

export default {
    signup,
    login,
};
