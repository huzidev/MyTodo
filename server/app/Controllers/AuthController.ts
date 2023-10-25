import { Response } from "express";
const User = require("@app/Models/User");

const AuthController = {
  // SignUp Function
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

  // SignIn Function
  SignIn: async (req: any, res: Response) => {
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
          return res
            .status(201)
            .json({ message: "User loggedIn successfully" });
        }
      } else {
        return res
          .status(500)
          .json({ message: "Failed! Internal Server Error" });
      }
    } catch (err) {
      console.log(err);
    }
  },

  SignOut: async (req: any, res: Response) => {
    res.clearCookie("jwtoken", { path: "/" });
    res.status(200).send("User loggedOut Successfully!");
}
};

module.exports = AuthController;
