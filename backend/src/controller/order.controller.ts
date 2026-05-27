import { Request, Response } from "express";
import { inngest } from "../inngest/index.js";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHanlder.js";

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { items, shippingAddress, paymentMethod } = req.body;

  const productIds = items.map((i: any) => i.product);
  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
    },
  });

  const productMap: Record<string, (typeof products)[0]> = {};

  products.forEach((p: any) => (productMap[p.id] = p));

  for (const item of items) {
    const product = productMap[item.product];
    if (!product) {
      throw new ApiError(404, `Product with id ${item.product} not found`);
    }
    if ((product.stock ?? 0) < item.quantity) {
      throw new ApiError(
        400,
        `Product with id ${item.product} has only ${product.stock} in stock`
      );
    }
  }

  const orderItems = items.map((i: any) => {
    const dbProduct = productMap[i.product];

    if (!dbProduct) {
      throw new ApiError(404, `Product with id ${i.product} not found`);
    }

    return {
      product: dbProduct.id,
      name: dbProduct.name,
      image: dbProduct.image,
      price: dbProduct.price,
      quantity: i.quantity,
      unit: dbProduct.unit,
    };
  });

  const subTotal = orderItems.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0
  );

  const deliveryFee = subTotal > 20 ? 0 : 1.99;
  const tax = Math.round(subTotal * 0.08 * 100) / 100;

  const order = await prisma.order.create({
    data: {
      userId: req.user!.id,
      items: orderItems,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      subtotal: subTotal,
      deliveryFee: deliveryFee,
      tax: tax,
      total: subTotal + deliveryFee + tax,
      statusHistory: [
        {
          status: "Placed",
          timestamp: new Date().toISOString(),
          note: "Order placed successfully",
        },
      ],
    },
  });

  if (paymentMethod === "card") {
    // await prisma.order.update({
    //   where: { id: order.id },
    //   data: { isPaid: true },
    // });
  }

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: order,
  });

  for (const item of orderItems) {
    await prisma.product.update({
      where: { id: item.product },
      data: { stock: { decrement: item.quantity } },
    });
  }

  // Send stock update events for each product in the order
  for (const item of orderItems) {
    await inngest.send({
      name: "inventory/stock.updated",
      data: {
        productId: item.product,
      },
    });
  }

  await inngest.send({
    name: "order/placed",
    data: {
      orderId: order.id,
    },
  });

  return;
});

export const getUserOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const { status } = req.query;

    const where: any = {
      userId: req.user!.id,
      NOT: [
        {
          paymentMethod: "card",
          isPaid: false,
        },
      ],
    };

    if (status && status !== "all") {
      where.status = status;
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        deliveryPartner: {
          select: {
            name: true,
            phone: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  }
);

export const getOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new ApiError(400, "Order ID is required");
    }
    const order = await prisma.order.findFirst({
      where: {
        id: id as string,
        userId: req.user!.id,
      },
      include: {
        deliveryPartner: {
          select: {
            name: true,
            phone: true,
            avatar: true,
            vehicleType: true,
          },
        },
      },
    });

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });

    return;
  }
);

export const updateOrder = asyncHandler(async (req: Request, res: Response) => {
  const { status, note } = req.body;
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Order ID is required");
  }

  const order = await prisma.order.findUnique({
    where: {
      id: id as string,
    },
  });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  const history = Array.isArray(order.statusHistory)
    ? order.statusHistory
    : ([] as any[]);
  history.push({
    status: status,
    note: note || `Order ${status.toLowerCase()} by ${req.user!.name}`,
    timestamp: new Date(),
  });

  const updatedOrder = await prisma.order.update({
    where: {
      id: req.params.id as string,
    },
    data: {
      status: status,
      statusHistory: history,
    },
  });

  res.status(200).json({
    success: true,
    message: "Order updated successfully",
    data: updatedOrder,
  });

  return;
});

//Admin
export const getAllOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const orders = await prisma.order.findMany({
      where: { NOT: [{}] },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            avatar: true,
          },
        },
        deliveryPartner: {
          select: {
            name: true,
            phone: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });

    return;
  }
);

export const getOrderLocation = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new ApiError(400, "Order ID is required");
    }
    const order = await prisma.order.findFirst({
      where: {
        id: id as string,
        userId: req.user!.id,
      },
      select: {
        liveLocation: true,
        status: true,
      },
    });

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    res.status(200).json({
      success: true,
      message: "Order location fetched successfully",
      data: {
        liveLocation: order.liveLocation,
        status: order.status,
      },
    });

    return;
  }
);
