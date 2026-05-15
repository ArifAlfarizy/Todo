import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { UserPayload } from "../types/user.type.js";

const accessSecretKey = process.env.ACCESS_SECRET_KEY;

if (!accessSecretKey) {
  throw new Error("SECRET_KEY is not defined");
}
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    const accessToken = authHeader?.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({
        error: "Access denied. No token provided.",
      });
    }

    const decoded = jwt.verify(accessToken, accessSecretKey) as UserPayload;

    req.user = decoded;

    next();
  } catch (err) {
    console.log(err)
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};
