import { TypesUser } from "@routes/user/types";
import { Response } from "express";
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
};

module.exports = UserController;
