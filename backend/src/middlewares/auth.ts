import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { HttpError } from "../utils/httpError";

export type AuthPayload = {
  sub: string;
  role: "admin";
};

declare global {
  // eslint-disable-next-line no-var
  var __auth: undefined;
}

declare module "express-serve-static-core" {
  interface Request {
    auth?: AuthPayload;
  }
}

function getToken(req: Request): string | null {
  const cookieToken = (req.cookies?.token as string | undefined) ?? undefined;
  if (cookieToken) return cookieToken;
  const header = req.header("authorization") ?? "";
  const [type, token] = header.split(" ");
  if (type?.toLowerCase() === "bearer" && token) return token;
  return null;
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const token = getToken(req);
  if (!token) return next(new HttpError(401, "Unauthorized"));

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as AuthPayload;
    req.auth = payload;
    return next();
  } catch {
    return next(new HttpError(401, "Invalid token"));
  }
}

export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  if (!req.auth) return next(new HttpError(401, "Unauthorized"));
  if (req.auth.role !== "admin") return next(new HttpError(403, "Forbidden"));
  return next();
}

