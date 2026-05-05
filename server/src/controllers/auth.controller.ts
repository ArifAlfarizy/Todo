import type { RegisterBody, UserPayload } from "../types/user.type.js";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { prisma } from "../lib/prisma.js";
import type { User } from "../../generated/prisma/index.js";
import { createUser, getUserByEmail } from "../services/user.service.js";
const secretKey = process.env.SECRET_KEY;

export const register = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response,
) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({ message: "Email already registered!" });
    }

    const salt = genSaltSync(10); // move salt to .env
    const hashedPassword = hashSync(password, salt);

    const user = await createUser({
      email,
      username: username || "",
      password: hashedPassword,
    });

    const payload: UserPayload = {
      userId: user.id,
    };

    if (!secretKey) {
      return res.status(400).json({ message: "Secret Key is not defined!" });
    }

    const token = jwt.sign(payload, secretKey, {
      expiresIn: "7d",
    });

    return res.status(201).json({
      token,
      user: { id: String(user.id), name: user.username, email: user.email },
    });
  } catch (err) {
    console.error("error", err);
  }
};
