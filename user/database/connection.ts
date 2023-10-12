import { mongoose } from "../../shared";
import config from "../config";
import logger from "../utils/logger";

export const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI!);
        logger.info("Database connected");
    } catch (error) {
        logger.error(error.message);
        process.exit(1);
    }
};
