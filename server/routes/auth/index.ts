import bcrypt from "bcrypt";
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

router.post("/sign_in", async (req: any, res: Response) => {
  try {
    let token: string;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(421).json({ error: "You've left an tag empty" });
    }
    const userEmail: any = await User.findOne({ email: email });
    if (!userEmail) {
      return res.status(422).json({ error: "No Such Email is Found!" });
    } else if (userEmail) {
      const isMatchPassword = await bcrypt.compare(
        password,
        userEmail.password
      );
      if (!isMatchPassword) {
        return res.status(423).json({ error: "Password is incorrect" });
      } else {
        token = await userEmail.generateAuthToken();
        res.cookie("jwtoken", token, {
          // expires : new Date(Date.now() + 86400000), // after 24 hours
          httpOnly: true,
        });
        return res.status(201).json({ message: "User loggedIn successfully" });
      }
    } else {
      return res.status(500).json({ message: "Failed! Internal Server Error" });
    }
  } catch (err) {
    console.log(err);
  }
});

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

router.get("/sign_out", (req: any, res: Response) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User loggedOut Successfully!");
});

router.get("/about", Verification, (req: any, res: Response) => {
  return res.json(req.userInfo);
});

module.exports = router;
