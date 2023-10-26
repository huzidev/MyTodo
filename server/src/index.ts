import bodyParser from "body-parser";
import cookie from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Response } from "express";

dotenv.config({ path: "config.env" });
require("@database/connection");

const server: Express = express();
const port: number = 8000;

server.use(express.json());
server.use(require("@routes/auth"));
server.use(require("@routes/user"));
server.use(require("@routes/notes"));

server.use(
  cors({
    origin: "*"
  })
);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookie());

server.post("/", (req: any, res: Response) => {
  res.send("Home page");
});

server.get('*', (req, res: Response) => {
  res.send({ message: "Hello, world" });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
