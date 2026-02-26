import { Router } from "express";
import path from "node:path";
import fs from "node:fs";
import mongoose from "mongoose";
import { MenuItem } from "../models/MenuItem";
import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middlewares/validate";
import { menuCreateSchema, menuListQuerySchema, menuUpdateSchema } from "../schemas/menuSchemas";
import { requireAdmin, requireAuth } from "../middlewares/auth";
import { upload } from "../middlewares/upload";
import { HttpError } from "../utils/httpError";

export const menuRouter = Router();

// Public: list menu items
menuRouter.get(
  "/",
  validate({ query: menuListQuerySchema }),
  asyncHandler(async (req, res) => {
    const { category, active, q } = req.query as any;
    const filter: any = {};
    if (category) filter.category = category;
    if (active !== undefined) filter.isActive = active;
    if (q) filter.$text = { $search: q };

    const items = await MenuItem.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ items });
  })
);

// Public: single item
menuRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) throw new HttpError(400, "Invalid id");
    const item = await MenuItem.findById(req.params.id).lean();
    if (!item) throw new HttpError(404, "Not found");
    res.json({ item });
  })
);

// Admin: create (with optional image)
menuRouter.post(
  "/",
  requireAuth,
  requireAdmin,
  upload.single("image"),
  asyncHandler(async (req, res) => {
    const body = menuCreateSchema.parse(req.body);
    const file = req.file;
    const image = file ? `/uploads/${file.filename}` : "";
    const item = await MenuItem.create({ ...body, image });
    res.status(201).json({ item });
  })
);

// Admin: update (optional image replace)
menuRouter.put(
  "/:id",
  requireAuth,
  requireAdmin,
  upload.single("image"),
  asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) throw new HttpError(400, "Invalid id");
    const updates = menuUpdateSchema.parse(req.body);
    const item = await MenuItem.findById(req.params.id);
    if (!item) throw new HttpError(404, "Not found");

    const file = req.file;
    if (file) {
      const old = item.image?.startsWith("/uploads/") ? item.image : "";
      if (old) {
        const oldPath = path.join(process.cwd(), old);
        fs.promises.unlink(oldPath).catch(() => undefined);
      }
      item.image = `/uploads/${file.filename}`;
    }

    if (updates.name !== undefined) item.name = updates.name;
    if (updates.description !== undefined) item.description = updates.description;
    if (updates.category !== undefined) item.category = updates.category;
    if (updates.price !== undefined) item.price = updates.price;
    if (updates.foodType !== undefined) item.foodType = updates.foodType as any;
    if (updates.isActive !== undefined) item.isActive = updates.isActive;

    await item.save();
    res.json({ item });
  })
);

// Admin: delete
menuRouter.delete(
  "/:id",
  requireAuth,
  requireAdmin,
  asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) throw new HttpError(400, "Invalid id");
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) throw new HttpError(404, "Not found");
    res.json({ message: "Deleted" });
  })
);

