import express from "express";
import proxy from "express-http-proxy";

const app = express();
// @ts-ignore
app.use(express.json());
// @ts-ignore
app.use(express.urlencoded({ extended: true }));
const s1Proxy = proxy("http://localhost:8081");
const s2Proxy = proxy("http://localhost:8082");
const s3Proxy = proxy("http://localhost:8083");

// @ts-ignore
app.use("/s1", s1Proxy);
// @ts-ignore
app.use(s2Proxy);
// @ts-ignore
app.use("/s2/category", s3Proxy);

const server = app.listen(8080, () => {
    console.log("Gateway is Listening to Port 8080");
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.info("Server closed");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: unknown) => {
    console.error(error);
    exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
