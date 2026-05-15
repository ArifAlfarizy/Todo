import jwt from "jsonwebtoken";
import type { UserPayload } from "../types/user.type.js";

const accessSecretKey = process.env.ACCESS_SECRET_KEY;
const refreshSecretKey = process.env.REFRESH_SECRET_KEY;

if (!accessSecretKey || !refreshSecretKey) {
  throw new Error("ACCESS_SECRET_KEY or REFRESH_SECRET_KEY is missing");
}


export const generateAccessToken = (payload: UserPayload) => {
  return jwt.sign(payload, accessSecretKey, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (payload: UserPayload) => {
  return jwt.sign(payload, refreshSecretKey)
}