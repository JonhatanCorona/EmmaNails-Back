import express from "express";
import router from "./routes";
import morgan from "morgan"
import cors from "cors"
import errorHandler from "./middlewares/errorHandler";

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(cors({
  origin: ['http://localhost:5173', 'https://emmanails-back-production.up.railway.app', 'https://emma-nails-front.vercel.app' , 'https://qldl7nf2-5173.use.devtunnels.ms'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

server.use(router)

server.use(errorHandler);

export default server;