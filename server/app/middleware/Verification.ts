import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { VerifyRequest } from './types';
const User = require("../../models/userSchema");

const Verification = async (req: VerifyRequest, res: Response, next: NextFunction) => {
    try {
        const token: string = req.cookies.jwtoken;
        const verifyUser: any = jwt.verify(token, process.env.SECRET_KEY!);
        const userInfo: any = await User.findOne({
            _id: verifyUser._id,
            "tokens.token": token // in mongoDB we've tokens in which token and :token is defined here
        })
        if (!userInfo) {
            res.status(404).send("User Not Found");
        }
        req.token = req.cookies.jwtoken;
        req.userInfo = userInfo;
        req.userID = userInfo._id;
        next();
    } catch (err) {
        res.status(401).send("No token provided");
        console.log("Token Error", err);
    }
}

module.exports = Verification;