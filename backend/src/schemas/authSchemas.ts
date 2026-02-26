import { z } from "zod";

export const bootstrapAdminSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  bootstrapKey: z.string().min(1),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

