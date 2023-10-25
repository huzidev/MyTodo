import { Request } from "express";

export interface VerifyRequest extends Request {
  token: string;
  userInfo: any;
  userID: number;
}
