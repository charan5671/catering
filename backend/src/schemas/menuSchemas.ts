import { z } from "zod";

export const menuCreateSchema = z.object({
  name: z.string().min(2).max(120),
  description: z.string().min(5).max(1000),
  category: z.string(),
  price: z.number().min(0),
  foodType: z.enum(["Veg", "Non-Veg"]),
  isActive: z.boolean().optional(),
});

export const menuUpdateSchema = menuCreateSchema.partial();

export const menuListQuerySchema = z.object({
  category: z.string().optional(),
  foodType: z.enum(["Veg", "Non-Veg"]).optional(),
  active: z
    .string()
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "true")),
  q: z.string().optional(),
});

