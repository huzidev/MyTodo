import cookie from "cookie-parser";
import cors from "cors";
import express, { Response } from "express";
import { TypesUser } from "./types";
const Verification = require("@app/Middleware/Verification");
const Contact = require("@app/Models/User");
const User = require("@app/Models/User");
const AuthController = require("@app/Controllers/AuthController");

require("@database/connection");

const router = express.Router();

router.use(
  cors({
    origin: '*',
  })
);

router.use(express.urlencoded({ extended: false }));
router.use(cookie());

router.post('/', (req: any, res: Response) => {
  res.send("Home page");
});

router.post("/sign_up", AuthController.SignUp);
router.post("/sign_in", AuthController.SignIn);
router.get("/sign_out", AuthController.SignOut);


router.post("/contact", async (req: any, res: Response) => {
  try {
    const { username, email, number, message } = req.body;

    if (!username) {
      return res.status(422).json({ error: "Username must be provide" });
    } else if (!email) {
      return res.status(423).json({ error: "Email must be provide" });
    } else if (!message) {
      return res.status(424).json({ error: "Mesasge field is empty" });
    }
    const userMessage = new Contact({
      username,
      email,
      number: number === null ? null : "+92" + number,
      message,
    });
    const userResponse = await userMessage.save();

    if (userResponse) {
      return res.status(200).json({ message: "Message Sent Successfully!" });
    } else {
      return res.status(500).json({ error: "Failed! Internal Server Error" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.put("/updateuser/:id", Verification, async (req: any, res: Response) => {
  const { username, email, number, isTheme } = req.body;
  try {
    const newInfo = <TypesUser>{};
    if (username) {
      newInfo.username = username;
    }
    if (email) {
      newInfo.email = email;
    }
    if (number) {
      newInfo.number = number;
    }
    if (!isTheme || isTheme) {
      newInfo.isTheme = isTheme;
    }
    let info = await User.findById(req.params.id);
    console.log("what is info", info);
    if (!info) {
      return res.status(404).json({ error: "Not Found" });
    }
    info = await User.findByIdAndUpdate(
      req.params.id,
      { $set: newInfo },
      { new: true }
    );
    res.json({ info });
  } catch (e) {
    console.log(e);
  }
});



router.get("/about", Verification, (req: any, res: Response) => {
  return res.json(req.userInfo);
});

module.exports = router;
