import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Role } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHanlder.js";

export const authMiddleware = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new ApiError(401, "Unauthorized");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "Unauthorized");
    }

    type TokenPayload = JwtPayload & { userId: string };

    let decoded: TokenPayload | string;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
      if (error) {
        throw new ApiError(401, "Unauthorized");
      }
      throw error;
    }

    if (typeof decoded === "string" || !decoded.userId) {
      throw new ApiError(401, "Unauthorized");
    }

    const payload = decoded as TokenPayload;

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user) {
      throw new ApiError(401, "Unauthorized");
    }

    req.user = user;

    next();
  }
);

export const isAdmin = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    if (req.user.role !== Role.ADMIN) {
      throw new ApiError(403, "Forbidden");
    }

    next();
  }
);
