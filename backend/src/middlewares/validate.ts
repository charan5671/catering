import type { RequestHandler } from "express";
import { z } from "zod";

type AnyZod = z.ZodTypeAny;

export function validate(options: {
  body?: AnyZod;
  query?: AnyZod;
  params?: AnyZod;
}): RequestHandler {
  return (req, _res, next) => {
    if (options.body) req.body = options.body.parse(req.body);
    if (options.query) req.query = options.query.parse(req.query) as any;
    if (options.params) req.params = options.params.parse(req.params) as any;
    next();
  };
}

