import mongoose from "mongoose";
import config from "../config";
import logger from "../utils/logger";

export const connectDB = async () => {
    try {
        logger.info("Connecting to database..." + config.MONGO_URI);
        await mongoose.connect(config.MONGO_URI!);
        logger.info("Database connected");
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
};
