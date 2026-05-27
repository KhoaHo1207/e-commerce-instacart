import z from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z
      .string({
        error: "Name is required",
      })
      .min(3, {
        error: "Name must be at least 3 characters long",
      }),
    email: z
      .string({
        error: "Email is required",
      })
      .email({
        error: "Invalid email address",
      }),
    password: z
      .string({
        error: "Password is required",
      })
      .min(8, {
        error: "Password must be at least 8 characters long",
      }),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({
        error: "Email is required",
      })
      .email({
        error: "Invalid email address",
      }),
    password: z
      .string({
        error: "Password is required",
      })
      .min(8, {
        error: "Password must be at least 8 characters long",
      }),
  }),
});
