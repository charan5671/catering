import { Router } from "express";
import { requireAdmin, requireAuth } from "../middlewares/auth";
import { asyncHandler } from "../utils/asyncHandler";
import { Booking } from "../models/Booking";
import { MenuItem } from "../models/MenuItem";

export const adminRouter = Router();

adminRouter.get(
  "/dashboard",
  requireAuth,
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const [totalBookings, totalMenuItems] = await Promise.all([
      Booking.countDocuments({}),
      MenuItem.countDocuments({}),
    ]);
    res.json({ totalBookings, totalMenuItems });
  })
);

