import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z
      .string({ error: "Name is required" })
      .min(1, { error: "Name is required" }),
    description: z
      .string({ error: "Description is required" })
      .min(1, { error: "Description is required" }),
    price: z
      .number({ error: "Price is required" })
      .positive({ error: "Price must be positive" }),
    originalPrice: z
      .number({ error: "Original price is required" })
      .positive({ error: "Original price must be positive" }),
    image: z
      .string({ error: "Image is required" })
      .url({ error: "Invalid image URL" }),
    category: z
      .string({ error: "Category is required" })
      .min(1, { error: "Category is required" })
      .max(50, { error: "Category must be less than 50 characters" }),
    unit: z
      .string({ error: "Unit is required" })
      .min(1, { error: "Unit is required" })
      .max(50, { error: "Unit must be less than 50 characters" }),
    stock: z
      .number({ error: "Stock is required" })
      .positive({ error: "Stock must be positive" }),
    isOrganic: z.boolean({ error: "Is organic is required" }).optional(),
    rating: z
      .number({ error: "Rating is required" })
      .positive({ error: "Rating must be positive" })
      .max(5, { error: "Rating must be less than 5" }),
    reviewCount: z
      .number({ error: "Review count is required" })
      .positive({ error: "Review count must be positive" }),
  }),
});

export const updateProductSchema = z.object({
  params: z.object({
    id: z
      .string({ error: "Product ID is required" })
      .uuid({ error: "Invalid product ID" }),
  }),
});

export const deleteProductSchema = z.object({
  params: z.object({
    id: z
      .string({ error: "Product ID is required" })
      .uuid({ error: "Invalid product ID" }),
  }),
});

export const getProductByIdSchema = z.object({
  params: z.object({
    id: z
      .string({ error: "Product ID is required" })
      .uuid({ error: "Invalid product ID" }),
  }),
});

export const getProductsSchema = z.object({
  query: z.object({
    category: z.string().optional(),
    search: z.string().trim().optional(),
    sort: z.enum(["price_asc", "price_desc", "rating", "name"]).optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    minPrice: z.coerce.number().nonnegative().optional(),
    maxPrice: z.coerce.number().nonnegative().optional(),
  }),
});
