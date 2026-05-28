import { z } from "zod";

export const createDeliveryPartnerSchema = z.object({
  body: z.object({
    name: z.string({ error: "Name is required" }),
    email: z
      .string({ error: "Email is required" })
      .email({ error: "Invalid email address" }),
    password: z
      .string({ error: "Password is required" })
      .min(6, { error: "Password must be at least 6 characters long" }),
    phone: z.string({ error: "Phone is required" }),
    vehicleType: z.string({ error: "Vehicle type is required" }).min(1, {
      error: "Vehicle type is required",
    }),
  }),
});

export const updateDeliveryPartnerSchema = z.object({
  body: z.object({
    name: z.string({ error: "Name is required" }).optional(),
    phone: z.string({ error: "Phone is required" }).optional(),
    vehicleType: z.string({ error: "Vehicle type is required" }).optional(),
    isActive: z.boolean({ error: "Is active is required" }).optional(),
  }),
});
