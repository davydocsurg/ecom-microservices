import httpStatus from "http-status";
import UserService from "../services/UserService";
import { catchAsync } from "../utils";

const signup = catchAsync(async (req, res) => {
    const { name, email, password, role } = req.body;

    const user = await UserService.create(name, email, password, role);
    return res.status(httpStatus.CREATED).send({ user });
});

export default {
    signup,
};
