import express from "express";
import router from "./routes";
import morgan from "morgan"
import cors from "cors"
import errorHandler from "./middlewares/errorHandler";

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());

server.use(router)

server.use(errorHandler);

export default server;