import Joi from "joi";
import { config } from "../../shared";
import { APIError } from "../utils";

const configFile = `./.env.${process.env.NODE_ENV}`;

config({ path: configFile });

const { MONGO_URI, NODE_ENV } = process.env;
const DEV = "development";
const PROD = "production";
const TEST = "test";

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string()
            .valid("production", "development", "test")
            .required(),
        PORT: Joi.number().default(3000),
        JWT_SECRET: Joi.string().required().description("JWT secret key"),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
            .default(30)
            .description("minutes after which access tokens expire"),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
            .default(30)
            .description("days after which refresh tokens expire"),
        JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
            .default(10)
            .description("minutes after which reset password token expires"),
        JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
            .default(10)
            .description("minutes after which verify email token expires"),
        SMTP_HOST: Joi.string().description("server that will send the emails"),
        SMTP_PORT: Joi.number().description(
            "port to connect to the email server"
        ),
        SMTP_USERNAME: Joi.string().description("username for email server"),
        SMTP_PASSWORD: Joi.string().description("password for email server"),
        EMAIL_FROM: Joi.string().description(
            "the from field in the emails sent by the app"
        ),
        FRONTEND_BASE_URL: Joi.string().description(
            "the baseurl of the frontend"
        ),
        ADMIN_DEFAULT_PASSWORD: Joi.string().description(
            "the default password for new admin"
        ),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);

if (!MONGO_URI) {
    throw new APIError(
        `MONGO_URI environment variable is not defined in ${configFile}`
    );
}

if (![DEV, PROD, TEST].includes(NODE_ENV || "")) {
    throw new APIError(
        `
        Invalid NODE_ENV value: ${NODE_ENV}. It must be set to either ${DEV}, ${PROD}, or ${TEST}.
        `
    );
}

export default { env: envVars.NODE_ENV, MONGO_URI, NODE_ENV, DEV, PROD, TEST };
