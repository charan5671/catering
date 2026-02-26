import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { User } from "../models/User";
import { asyncHandler } from "../utils/asyncHandler";
import { HttpError } from "../utils/httpError";
import { validate } from "../middlewares/validate";
import { bootstrapAdminSchema, loginSchema } from "../schemas/authSchemas";
import { requireAuth } from "../middlewares/auth";

export const authRouter = Router();

function setAuthCookie(res: any, token: string) {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.COOKIE_SECURE,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    path: "/",
  });
}

authRouter.post(
  "/bootstrap-admin",
  validate({ body: bootstrapAdminSchema }),
  asyncHandler(async (req, res) => {
    const { email, password, bootstrapKey } = req.body as {
      email: string;
      password: string;
      bootstrapKey: string;
    };

    if (!process.env.BOOTSTRAP_KEY || bootstrapKey !== process.env.BOOTSTRAP_KEY) {
      throw new HttpError(403, "Invalid bootstrap key");
    }

    const existing = await User.countDocuments({});
    if (existing > 0) {
      throw new HttpError(409, "Admin already exists");
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ email, passwordHash, role: "admin" });

    const token = jwt.sign({ sub: user._id.toString(), role: "admin" }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });
    setAuthCookie(res, token);

    res.status(201).json({ message: "Admin created", user: { email: user.email, role: user.role } });
  })
);

authRouter.post(
  "/login",
  validate({ body: loginSchema }),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body as { email: string; password: string };
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) throw new HttpError(401, "Invalid credentials");
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new HttpError(401, "Invalid credentials");

    const token = jwt.sign({ sub: user._id.toString(), role: user.role }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });
    setAuthCookie(res, token);
    res.json({ message: "Logged in" });
  })
);

authRouter.post(
  "/logout",
  asyncHandler(async (_req, res) => {
    res.clearCookie("token", { path: "/" });
    res.json({ message: "Logged out" });
  })
);

authRouter.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.auth!.sub).select("email role");
    if (!user) throw new HttpError(401, "Unauthorized");
    res.json({ user });
  })
);

