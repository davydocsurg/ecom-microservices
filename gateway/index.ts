import express from "express";
import proxy from "express-http-proxy";

const app = express();

app.use(express.json());
app.use(proxy("http://localhost:8081"));
app.use(proxy("http://localhost:8082"));
app.use(proxy("http://localhost:8083"));

app.listen(8080, () => {
    console.log("Gateway is Listening to Port 8080");
});
