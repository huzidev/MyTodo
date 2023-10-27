import cookie from "cookie-parser";
import cors from "cors";
import express from "express";
const AuthController = require("@app/Controllers/AuthController");

require("@database/connection");

const router = express.Router();

router.use(
  cors({
    origin: "*",
  })
);

router.use(express.urlencoded({ extended: false }));
router.use(cookie());

router.post("/sign_up", AuthController.SignUp);
router.post("/sign_in", AuthController.SignIn);
router.get("/sign_out", AuthController.SignOut);

module.exports = router;
