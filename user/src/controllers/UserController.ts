import { httpStatus } from "../../../shared";
import UserRepo from "../repository/UserRepo";
import { catchAsync } from "../utils";

const createUser = catchAsync(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    const user = await UserRepo.create(name, email, password, role);
    res.status(httpStatus.CREATED).send({ user });
});

export default {
    createUser,
};
