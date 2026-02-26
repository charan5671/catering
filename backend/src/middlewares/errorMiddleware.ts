import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { HttpError } from "../utils/httpError";

export function notFound(req: Request, res: Response) {
  res.status(404).json({ message: `Not found: ${req.method} ${req.path}` });
}

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof z.ZodError) {
    return res.status(400).json({
      message: "Validation error",
      issues: err.issues,
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      message: err.message,
      details: err.details,
    });
  }

  // eslint-disable-next-line no-console
  console.error(err);
  return res.status(500).json({ message: "Internal server error" });
}

