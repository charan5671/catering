import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import path from "node:path";
import fs from "node:fs";
import { env } from "./config/env";
import { authRouter } from "./routes/authRoutes";
import { menuRouter } from "./routes/menuRoutes";
import { bookingRouter } from "./routes/bookingRoutes";
import { adminRouter } from "./routes/adminRoutes";
import reviewRouter from "./routes/reviewRoutes";
import { errorMiddleware, notFound } from "./middlewares/errorMiddleware";

export function createApp() {
  const app = express();

  // ensure uploads dir exists
  const uploadsDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(
    cors({
      origin: env.CLIENT_ORIGIN,
      credentials: true,
    })
  );
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 200,
      standardHeaders: "draft-8",
      legacyHeaders: false,
    })
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());
  app.use(mongoSanitize());
  app.use(hpp());

  app.get("/api/health", (_req, res) => res.json({ ok: true }));
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  app.use("/api/auth", authRouter);
  app.use("/api/menu", menuRouter);
  app.use("/api/bookings", bookingRouter);
  app.use("/api/admin", adminRouter);
  app.use("/api/reviews", reviewRouter);

  app.use(notFound);
  app.use(errorMiddleware);

  return app;
}

