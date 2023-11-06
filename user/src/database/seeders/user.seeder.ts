import config from "../../config";
import UserRepo from "../../repository/UserRepo";
import { UserService } from "../../services";
import { logger } from "../../utils";

const seedAdmin = async () => {
    const admin = await UserRepo.getUserByEmail(config.adminEmail);
    if (!admin) {
        await UserService.create(
            config.adminName,
            config.adminEmail,
            config.adminPassword,
            "admin"
        );
        logger.info("Admin account created");
    }
};

export default {
    seedAdmin,
};
