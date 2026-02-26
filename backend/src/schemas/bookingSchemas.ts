import { z } from "zod";

export const bookingCreateSchema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().min(7).max(30),
  email: z.string().email(),
  eventDate: z.string().datetime(),
  eventAddress: z.string().min(5).max(1000),
  numberOfPeople: z.number().int().min(1).max(10000),
  foodType: z.enum(["Veg", "Non-Veg", "Both"]),
  dishIds: z.array(z.string().min(24).max(24)).min(1).max(200),
  specialInstructions: z.string().max(2000).optional(),
});

export const bookingAdminListQuerySchema = z.object({
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  status: z.enum(["Pending", "Confirmed", "Completed"]).optional(),
});

export const bookingStatusUpdateSchema = z.object({
  status: z.enum(["Pending", "Confirmed", "Completed"]),
});

