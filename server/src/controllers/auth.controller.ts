import type {
  LoginBody,
  RegisterBody,
  UserPayload,
} from "../types/user.type.js";
import type { Request, Response } from "express";
import { compare, genSaltSync, hashSync } from "bcrypt-ts";
import { createUser, getUserByEmail } from "../services/user.service.js";
import { generateToken } from "../utils/jwt.util.js";
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

    const token = generateToken(payload);

    return res.status(201).json({
      token,
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

    const token = generateToken(payload);

    res.cookie("token", token);

    return res.status(201).json({
      message: "Login successfully",
      token,
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

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token tidak ditemukan",
      });
    }

    res.clearCookie("token", {});

    return res.status(200).json({
      success: true,
      message: "Berhasil logout",
    });
  } catch (err) {
    console.error("error", err);
  }
};