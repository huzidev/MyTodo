import bodyParser from "body-parser";
import cookie from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Response } from "express";

dotenv.config({ path: "config.env" });
// require("Database/connection.ts");
require("@database/connection");
// require('../database/connection');

const server: Express = express();
const port: number = 8000;

server.use(express.json());
// server.use(require("Router/auth"));
// server.use(require("Router/notes"));
server.use(require("@routes/auth"));
server.use(require("@routes/notes"));

server.use(
  cors({
    origin: "*",
  })
);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookie());

server.get('*', (req, res: Response) => {
  res.send({ message: "Hello, world" });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
