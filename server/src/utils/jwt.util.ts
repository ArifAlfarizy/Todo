import jwt from "jsonwebtoken";
import type { UserPayload } from "../types/user.type.js";

const secretKey = process.env.SECRET_KEY!;

export const generateToken = (payload: UserPayload) => {
  return jwt.sign(payload, secretKey, {
    expiresIn: "1h",
  });
};