import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    items: z.array(
      z.object({
        product: z.string({ error: "Product is required" }),
        name: z.string({ error: "Name is required" }),
        image: z.string({ error: "Image is required" }),
        price: z.number({ error: "Price is required" }),
        quantity: z.number({ error: "Quantity is required" }),
        unit: z.string({ error: "Unit is required" }),
      })
    ),
    shippingAddress: z.object({
      address: z.string({ error: "Address is required" }),
      city: z.string({ error: "City is required" }),
      state: z.string({ error: "State is required" }),
      zip: z.string({ error: "Zip is required" }),
      lat: z.number({ error: "Lat is required" }),
      lng: z.number({ error: "Lng is required" }),
    }),
    paymentMethod: z.enum(["card", "cash"], {
      error: "Payment method is required",
    }),
  }),
});

export const updateOrderSchema = z.object({
  body: z.object({
    status: z.string({
      error: "Status is required",
    }),
    note: z.string({ error: "Note is required" }),
  }),
});
