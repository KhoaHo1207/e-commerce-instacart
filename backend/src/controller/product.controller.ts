import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHanlder.js";
import { prisma } from "../lib/prisma.js";
import { Prisma, Product } from "../generated/prisma/client.js";
import { ApiError } from "../utils/ApiError.js";

const calculateDiscount = (
  originalPrice: number | null,
  price: number | null
) => {
  if (!originalPrice || !price) {
    return 0;
  }

  if (originalPrice <= price) {
    return 0;
  }

  return Math.round(((originalPrice - price) / originalPrice) * 100);
};

export const getFlashDeals = asyncHandler(
  async (_req: Request, res: Response) => {
    const products = await prisma.product.findMany({
      where: {
        stock: {
          gt: 0,
        },
      },
      orderBy: {
        originalPrice: "desc",
      },
    });

    const productsWithDiscount = products.map((p: Product) => {
      const discount = calculateDiscount(p.originalPrice, p.price);
      return {
        ...p,
        discount,
      };
    });

    res.status(200).json({
      success: true,
      message: "Flash deals fetched successfully",
      data: productsWithDiscount.slice(0, 8),
    });

    return;
  }
);

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const query = res.locals.validated.query;
  const {
    category,
    sort,
    page = 1,
    minPrice,
    maxPrice,
    search,
    limit = 10,
  } = query;

  const where: Prisma.ProductWhereInput = {};

  if (category && category !== "all") {
    where.category = category;
  }

  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};

    if (minPrice !== undefined) {
      where.price.gte = Number(minPrice);
    }

    if (maxPrice !== undefined) {
      where.price.lte = Number(maxPrice);
    }
  }

  const orderBy: Prisma.ProductOrderByWithRelationInput = {};

  if (sort === "price_asc") orderBy.price = "asc";
  else if (sort === "price_desc") orderBy.price = "desc";
  else if (sort === "rating") orderBy.rating = "desc";
  else if (sort === "name") orderBy.name = "asc";
  else orderBy.createdAt = "desc";

  const skip = (Number(page) - 1) * Number(limit);

  const [total, products] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: Number(limit),
    }),
  ]);

  const totalPages = Math.ceil(total / Number(limit));

  const productsWithDiscount = products.map((product) => ({
    ...product,
    discount: calculateDiscount(product.originalPrice, product.price),
  }));

  return res.status(200).json({
    success: true,
    data: {
      products: productsWithDiscount,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalItems: total,
        totalPages,
        hasNextPage: Number(page) < totalPages,
        hasPrevPage: Number(page) > 1,
      },
    },
  });
});

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        id: id as string,
      },
    });

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: {
        product: {
          ...product,
          discount: calculateDiscount(product.originalPrice, product.price),
        },
      },
    });

    return;
  }
);

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const newProduct = await prisma.product.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        unit: req.body.unit,
        originalPrice: req.body.originalPrice
          ? Number(req.body.originalPrice)
          : null,
        price: Number(req.body.price),
        stock: Number(req.body.stock),
        isOrganic: req.body.isOrganic ? true : false,
        rating: Number(req.body.rating),
        reviewCount: Number(req.body.reviewCount),
      },
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: {
        product: newProduct,
      },
    });
  }
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const existingProduct = await prisma.product.findUnique({
      where: {
        id: id as string,
      },
    });

    if (!existingProduct) {
      throw new ApiError(404, "Product not found");
    }

    const {
      name,
      description,
      price,
      originalPrice,
      image,
      category,
      unit,
      stock,
      isOrganic,
      rating,
      reviewCount,
    } = req.body;

    const data: Prisma.ProductUpdateInput = {};

    if (name !== undefined) data.name = String(name);

    if (description !== undefined) {
      data.description = String(description);
    }

    if (price !== undefined) {
      data.price = Number(price);
    }

    if (originalPrice !== undefined) {
      data.originalPrice = Number(originalPrice);
    }

    if (image !== undefined) {
      data.image = String(image);
    }

    if (category !== undefined) {
      data.category = String(category);
    }

    if (unit !== undefined) {
      data.unit = String(unit);
    }

    if (stock !== undefined) {
      data.stock = Number(stock);
    }

    if (isOrganic !== undefined) {
      data.isOrganic = Boolean(isOrganic);
    }

    if (rating !== undefined) {
      data.rating = Number(rating);
    }

    if (reviewCount !== undefined) {
      data.reviewCount = Number(reviewCount);
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: id as string,
      },
      data,
    });

    res.status(200).json({
      message: "Product updated successfully",
      success: true,
      data: updatedProduct,
    });

    return;
  }
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const existingProduct = await prisma.product.findUnique({
      where: {
        id: id as string,
      },
    });

    if (!existingProduct) {
      throw new ApiError(404, "Product not found");
    }

    await prisma.product.delete({
      where: {
        id: id as string,
      },
    });

    res.status(200).json({
      message: "Product deleted successfully",
      success: true,
    });

    return;
  }
);
