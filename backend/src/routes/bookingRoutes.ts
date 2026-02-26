import { Router } from "express";
import mongoose from "mongoose";
import { Booking } from "../models/Booking";
import { MenuItem } from "../models/MenuItem";
import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middlewares/validate";
import {
  bookingAdminListQuerySchema,
  bookingCreateSchema,
  bookingStatusUpdateSchema,
} from "../schemas/bookingSchemas";
import { bookingDedupeKey } from "../utils/dedupe";
import { HttpError } from "../utils/httpError";
import { requireAdmin, requireAuth } from "../middlewares/auth";

export const bookingRouter = Router();

// Public: create booking
bookingRouter.post(
  "/",
  validate({ body: bookingCreateSchema }),
  asyncHandler(async (req, res) => {
    const body = req.body as any;

    const eventDate = new Date(body.eventDate);
    if (Number.isNaN(eventDate.getTime())) throw new HttpError(400, "Invalid event date");
    if (eventDate.getTime() < Date.now() - 1000 * 60 * 60 * 24) {
      throw new HttpError(400, "Event date must be in the future");
    }

    // Validate dish ids exist and active
    const dishObjectIds = body.dishIds.map((id: string) => new mongoose.Types.ObjectId(id));
    const dishes = await MenuItem.find({ _id: { $in: dishObjectIds }, isActive: true }).select("_id");
    if (dishes.length !== dishObjectIds.length) {
      throw new HttpError(400, "One or more selected dishes are invalid");
    }

    const dedupeKey = bookingDedupeKey({
      phone: body.phone,
      eventDateISO: eventDate.toISOString(),
      eventAddress: body.eventAddress,
    });

    try {
      const booking = await Booking.create({
        name: body.name,
        phone: body.phone,
        email: body.email,
        eventDate,
        eventAddress: body.eventAddress,
        numberOfPeople: body.numberOfPeople,
        foodType: body.foodType,
        dishIds: dishObjectIds,
        specialInstructions: body.specialInstructions ?? "",
        dedupeKey,
      });

      res.status(201).json({ message: "Booking created", bookingId: booking._id });
    } catch (e: any) {
      if (e?.code === 11000) {
        throw new HttpError(409, "Duplicate booking detected. Please contact us if this is a mistake.");
      }
      throw e;
    }
  })
);

// Admin: list bookings with filters
bookingRouter.get(
  "/admin",
  requireAuth,
  requireAdmin,
  validate({ query: bookingAdminListQuerySchema }),
  asyncHandler(async (req, res) => {
    const { from, to, status } = req.query as any;
    const filter: any = {};
    if (status) filter.status = status;
    if (from || to) {
      filter.eventDate = {};
      if (from) filter.eventDate.$gte = new Date(from);
      if (to) filter.eventDate.$lte = new Date(to);
    }

    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .populate("dishIds", "name category")
      .lean();

    res.json({ bookings });
  })
);

// Admin: update status
bookingRouter.patch(
  "/:id/status",
  requireAuth,
  requireAdmin,
  validate({ body: bookingStatusUpdateSchema }),
  asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) throw new HttpError(400, "Invalid id");
    const { status } = req.body as any;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).lean();
    if (!booking) throw new HttpError(404, "Not found");
    res.json({ booking });
  })
);

// Admin: summary
bookingRouter.get(
  "/admin/summary",
  requireAuth,
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const [totalBookings, pendingBookings] = await Promise.all([
      Booking.countDocuments({}),
      Booking.countDocuments({ status: "Pending" }),
    ]);
    res.json({ totalBookings, pendingBookings });
  })
);

