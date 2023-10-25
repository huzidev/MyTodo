import cors from "cors";
import express, { Response } from "express";
const router = express.Router();
const Verification = require("@app/Middleware/Verification");
const UserController = require("@app/Controllers/UserController");

router.use(
  cors({
    origin: '*',
  })
);

router.post("/contact", UserController.Contact);
router.put("/updateuser/:id", Verification, UserController.Update);

router.get("/about", Verification, (req: any, res: Response) => {
  return res.json(req.userInfo);
});