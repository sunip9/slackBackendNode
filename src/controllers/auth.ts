import { Request, Response, NextFunction } from "express";
import UserRepo from "../repos/user-repo";
import { Password } from "../services/password";
import { BadRequestError } from "../errors/bad-request-error";
import Jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-change-in-production";
const COOKIE_EXPIRES_DAYS = parseInt(process.env.COOKIE_EXPIRES_DAYS || "30");

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingUser = await UserRepo.findOne(email);

  if (existingUser) {
    throw new BadRequestError("Email already in use !");
  }
  const user = await UserRepo.build(email, password);
  //generate JWT
  const userJwt = Jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "30d" }
  );
  
  const cookieOptions = {
    expires: new Date(Date.now() + COOKIE_EXPIRES_DAYS * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  };
  
  res.status(201).cookie("token", userJwt, cookieOptions).json({ 
    user: { id: user.id, email: user.email }, 
    token: userJwt 
  });
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingUser = await UserRepo.findOne(email);
  if (!existingUser) {
    throw new BadRequestError("Invalid Crendentials !");
  }
  const passwordMatch = await Password.compare(existingUser.password, password);
  if (!passwordMatch) {
    throw new BadRequestError("Invalid Crendentials !");
  }

  //generate JWT
  const userJwt = Jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
    },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "30d" }
  );
  
  const cookieOptions = {
    expires: new Date(Date.now() + COOKIE_EXPIRES_DAYS * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  };
  
  res
    .status(200)
    .cookie("token", userJwt, cookieOptions)
    .json({ id: existingUser.id, email: existingUser.email, token: userJwt });
};

// export const currentUser = (req: Request, res: Response) => {
//   res.send({ currentUser: req.currentUser });
// };

export const signOut = (req: Request, res: Response) => {
  req.session = null;
  res.send({});
};
