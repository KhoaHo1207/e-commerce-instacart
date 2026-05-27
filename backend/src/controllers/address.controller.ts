import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHanlder.js";

export const gerAddresses = asyncHandler(
  async (req: Request, res: Response) => {
    const addresses = await prisma.address.findMany({
      where: {
        userId: req.user!.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.status(200).json({
      success: true,
      message: "Addresses fetched successfully",
      data: addresses,
    });

    return;
  }
);

export const addAddress = asyncHandler(async (req: Request, res: Response) => {
  const {
    label,
    address,
    city,
    state,
    zip,
    isDefault = false,
    lat = 0,
    lng = 0,
  } = req.body;

  if (lat === null || lng === null) {
    throw new ApiError(400, "Latitude and longitude cannot be null");
  }

  const currentAddresses = await prisma.address.findMany({
    where: {
      userId: req.user!.id,
    },
  });

  let makeDefault = isDefault;

  if (currentAddresses.length === 0) makeDefault = true;

  if (makeDefault) {
    await prisma.address.updateMany({
      where: {
        userId: req.user!.id,
      },
      data: {
        isDefault: false,
      },
    });
  }

  await prisma.address.create({
    data: {
      userId: req.user!.id,
      label,
      address,
      city,
      state,
      zip,
      isDefault: makeDefault,
      lat: Number(lat),
      lng: Number(lng),
    },
  });

  const addresses = await prisma.address.findMany({
    where: {
      userId: req.user!.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  res.status(201).json({
    success: true,
    message: "Address created successfully",
    data: addresses,
  });

  return;
});

export const updateAddress = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const {} = req.body;
    const {
      label,
      address,
      city,
      state,
      zip,
      isDefault = false,
      lat,
      lng,
    } = req.body;

    if (lat === null || lng === null) {
      throw new ApiError(400, "Latitude and longitude cannot be null");
    }

    if (isDefault) {
      await prisma.address.updateMany({
        where: {
          userId: req.user!.id,
        },
        data: {
          isDefault: false,
        },
      });
    }

    const data: any = {};

    if (label) data.label = label;
    if (address) data.address = address;
    if (city) data.city = city;
    if (state) data.state = state;
    if (zip) data.zip = zip;
    if (isDefault !== undefined) data.isDefault = isDefault;
    if (lat) data.lat = Number(lat);
    if (lng) data.lng = Number(lng);

    await prisma.address.update({
      where: {
        id: id as string,
      },
      data,
    });

    try {
      await prisma.address.update({
        where: {
          id: id as string,
        },
        data,
      });
    } catch (error) {
      throw new ApiError(400, "Failed to update address");
    }

    const addresses = await prisma.address.findMany({
      where: {
        userId: req.user!.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: addresses,
    });

    return;
  }
);

export const deleteAddress = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const existingAddress = await prisma.address.findUnique({
      where: {
        id: id as string,
      },
    });

    if (!existingAddress) {
      throw new ApiError(404, "Address not found");
    }

    try {
      await prisma.address.delete({
        where: {
          id: id as string,
        },
      });
    } catch (error) {
      throw new ApiError(400, "Failed to delete address");
    }

    const addresses = await prisma.address.findMany({
      where: {
        userId: req.user!.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      data: addresses,
    });

    return;
  }
);
