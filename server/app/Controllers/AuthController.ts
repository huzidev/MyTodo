import { Response } from "express";
const User = require("@app/Models/User");


const AuthController = {
  SignUp: async (req: any, res: Response) => {
    const { username, email, number, password, cpassword, isTheme } = req.body;
    if (!username || !email || !number || !password || !cpassword) {
      return res.status(421).json({ error: "You've left a tag empty" });
    }
    try {
      const emailExist = await User.findOne({ email: email });
      const usernameExist = await User.findOne({ username: username });
      const numberExist = await User.findOne({ number: number });
      if (usernameExist) {
        return res.status(422).json({ error: "Username already Exist" });
      } else if (emailExist) {
        return res.status(423).json({ error: "Email already Exist" });
      } else if (numberExist) {
        return res.status(424).json({ error: "Number already Exist" });
      } else if (password !== cpassword) {
        return res.status(425).json({ error: "Password doesn't match" });
      } else if (username.length < 3) {
        return res
          .status(426)
          .json({ error: "Username must be 3 characters Long" });
      } else if ((password.length || cpassword.length) < 6) {
        return res
          .status(427)
          .json({ error: "Password must be 6 characters Long" });
      }
      // when user registered successfully
      else {
        const user = new User({
          username,
          email,
          number: "+92" + number,
          password,
          cpassword,
          isTheme,
        });
        const userRegister = await user.save();
        if (userRegister) {
          return res
            .status(200)
            .json({ message: "User registered successfully!" });
        } else {
          return res
            .status(500)
            .json({ message: "Failed! Internal Server Error" });
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = AuthController;