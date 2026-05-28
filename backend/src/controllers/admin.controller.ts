import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHanlder.js";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import { ApiError } from "../utils/ApiError.js";
export const getAdminStats = asyncHandler(
  async (_req: Request, res: Response) => {
    const [
      totalOrders,
      totalUsers,
      totalProducts,
      outOfStock,
      totalPartners,
      recentOrders,
    ] = await Promise.all([
      prisma.order.count({
        where: {
          NOT: [
            {
              paymentMethod: "card",
              isPaid: false,
            },
          ],
        },
      }),

      prisma.user.count(),
      prisma.product.count(),
      prisma.product.count({ where: { stock: 0 } }),
      prisma.deliveryPartner.count(),
      prisma.order.findMany({
        where: {
          NOT: [
            {
              paymentMethod: "card",
              isPaid: false,
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 8,
        include: {
          user: {
            select: {
              name: true,
              email: true,
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
      }),
    ]);
    res.status(200).json({
      success: true,
      message: "Admin stats fetched successfully",
      data: {
        totalOrders,
        totalUsers,
        totalProducts,
        outOfStock,
        totalPartners,
        recentOrders,
      },
    });
    return;
  }
);

export const getDeliveryPartners = asyncHandler(
  async (_req: Request, res: Response) => {
    const partners = await prisma.deliveryPartner.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      message: "Delivery partners fetched successfully",
      data: partners,
    });
    return;
  }
);

export const createDeliveryPartner = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password, phone, vehicleType } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDeliveryPartner = await prisma.deliveryPartner.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        phone: phone.trim(),
        vehicleType: vehicleType.trim(),
      },
    });

    res.status(201).json({
      success: true,
      message: "Delivery partner created successfully",
      data: newDeliveryPartner,
    });
    return;
  }
);

export const updateDeliveryPartner = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const { name, phone, vehicleType, isActive } = req.body;

    const data: any = {};
    if (name) data.name = name.trim();
    if (phone) data.phone = phone.trim();
    if (vehicleType) data.vehicleType = vehicleType.trim();
    if (isActive) data.isActive = isActive;

    const updatedDeliveryPartner = await prisma.deliveryPartner.update({
      where: { id },
      data,
    });

    res.status(200).json({
      success: true,
      message: "Delivery partner updated successfully",
      data: updatedDeliveryPartner,
    });

    return;
  }
);

export const assignDeliveryPartner = asyncHandler(
  async (req: Request, res: Response) => {
    const { partnerId } = req.body;

    const order = await prisma.order.findUnique({
      where: {
        id: req.params.orderId as string,
      },
    });

    const partner = await prisma.deliveryPartner.findUnique({
      where: {
        id: partnerId as string,
      },
    });

    if (!partner) {
      throw new ApiError(404, "Delivery partner not found");
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    let status = order!.status;

    const history: any[] = Array.isArray(order!.statusHistory)
      ? order!.statusHistory
      : [];

    if (order?.status === "Placed" || order?.status === "Confirmed") {
      status = "Assigned";
      history.push({
        status: "Assigned",
        note: `Assigned to ${partner.name}`,
        timestamp: new Date(),
      });
    }

    await prisma.order.update({
      where: {
        id: order!.id,
      },
      data: {
        deliveryPartnerId: partner.id,
        deliveryOtp: otp,
        status: status,
        statusHistory: history,
      },
    });

    res.status(200).json({
      success: true,
      message: "Delivery partner assigned successfully",
      data: {
        order,
      },
    });
    return;
  }
);
