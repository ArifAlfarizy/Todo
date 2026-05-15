import type {
  LoginBody,
  RegisterBody,
  UserPayload,
} from "../types/user.type.js";
import type { Request, Response } from "express";
import { compare, genSaltSync, hashSync } from "bcrypt-ts";
import { createUser, getUserByEmail } from "../services/user.service.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.util.js";
import jwt from "jsonwebtoken";
const refreshSecretKey = process.env.REFRESH_SECRET_KEY;

if (!refreshSecretKey) {
  throw new Error("REFRESH_SECRET_KEY is missing");
}

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

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(201).json({
      accessToken,
      user: { id: String(user.id), name: user.username, email: user.email },
    });
  } catch (err) {
    console.error("error", err);
  }
};

export const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Email not found. Try creating a new account!" });
    }

    const match = await compare(password, existingUser.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const payload: UserPayload = {
      userId: existingUser.id,
    };

    const accessToken = generateAccessToken(payload);

    const refreshToken = generateRefreshToken(payload);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(201).json({
      message: "Login successfully",
      accessToken,
      user: {
        id: String(existingUser.id),
        name: existingUser.username,
        email: existingUser.email,
      },
    });
  } catch (err) {
    console.error("error", err);
  }
};

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({
      success: false,
      message: "Token not found",
    });
  }

  const decoded = jwt.verify(refreshToken, refreshSecretKey) as UserPayload;

  const accessToken = generateAccessToken(decoded);

  return res.status(200).json({
    success: true,
    token: accessToken,
  });
};

export const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Token not found",
      });
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out",
    });
  } catch (err) {
    console.error("error", err);
  }
};
