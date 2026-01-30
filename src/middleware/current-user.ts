import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const JWT_SECRET =
  process.env.JWT_SECRET || "fallback-secret-change-in-production";

interface UserPayload {
  id: string;
  email: string;
}

//adding currentUser in req
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
export const currentUser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  // if (!req.session?.jwt) {
  //   return next();
  // }
  // try {
  //   const payload = Jwt.verify(req.session.jwt, "asdf") as UserPayload;
  //   req.currentUser = payload;
  // } catch (error) {}
  if (!req.cookies?.token) {
    return next();
  }
  try {
    const payload = Jwt.verify(req.cookies?.token, JWT_SECRET) as UserPayload;
    req.currentUser = payload;
  } catch (error) {}
  next();
};
