import { TypesUser } from "@routes/user/types";
import { Response } from "express";
const Contact = require("@app/Models/User");
const User = require("@app/Models/User");

const UserController = {
  // Update User
  Update: async (req: any, res: Response) => {
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
  },

  // Contact Us Function
  Contact: async (req: any, res: Response) => {
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
}
};

module.exports = UserController;
