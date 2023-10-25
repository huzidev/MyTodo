import cors from "cors";
import express, { Response } from "express";
const router = express.Router();
const Verification = require("@app/Middleware/Verification");
const Contact = require("@app/Models/User");
const User = require("@app/Models/User");
const UserController = require("@app/Controllers/UserController");

router.use(
  cors({
    origin: '*',
  })
);

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

router.put("/updateuser/:id", UserController.Update);



router.get("/about", Verification, (req: any, res: Response) => {
  return res.json(req.userInfo);
});