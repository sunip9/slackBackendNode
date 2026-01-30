import { Request, Response } from "express";
import { getAuthService } from "../container";
import * as dotenv from "dotenv";
dotenv.config();

const COOKIE_EXPIRES_DAYS = parseInt(process.env.COOKIE_EXPIRES_DAYS || "30");
const authService = getAuthService();

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authService.signUp({ email, password });

  const cookieOptions = {
    expires: new Date(Date.now() + COOKIE_EXPIRES_DAYS * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  };

  res.status(201).cookie("token", result.token, cookieOptions).json(result);
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authService.signIn({ email, password });

  const cookieOptions = {
    expires: new Date(Date.now() + COOKIE_EXPIRES_DAYS * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  };

  res.status(200).cookie("token", result.token, cookieOptions).json(result);
};

// export const currentUser = (req: Request, res: Response) => {
//   res.send({ currentUser: req.currentUser });
// };

export const signOut = (req: Request, res: Response) => {
  req.session = null;
  res.send({});
};
