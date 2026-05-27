import { z } from "zod";

export const addAddressSchema = z.object({
  body: z.object({
    label: z.string({ error: "Label is required" }),
    address: z.string({ error: "Address is required" }),
    city: z.string({ error: "City is required" }),
    state: z.string({ error: "State is required" }),
    zip: z.string({ error: "Zip is required" }),
    isDefault: z.boolean({ error: "Is default is required" }),
    lat: z.coerce.number({ error: "Lat is required" }),
    lng: z.coerce.number({ error: "Lng is required" }),
  }),
});

export const updateAddressSchema = z.object({
  body: z.object({
    label: z.string({ error: "Label must be a string" }).optional(),
    address: z.string({ error: "Address must be a string" }).optional(),
    city: z.string({ error: "City must be a string" }).optional(),
    state: z.string({ error: "State must be a string" }).optional(),
    zip: z.string({ error: "Zip must be a string" }).optional(),
    isDefault: z.boolean({ error: "Is default must be a boolean" }).optional(),
    lat: z.coerce.number({ error: "Lat must be a number" }).optional(),
    lng: z.coerce.number({ error: "Lng must be a number" }).optional(),
  }),
});
