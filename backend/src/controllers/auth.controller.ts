import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHanlder.js";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils/jwt.js";

//Register
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (existingUser) {
    throw new ApiError(400, "Email has already been registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    },
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
  });

  return;
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email.trim().toLowerCase(),
    },
  });

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateAccessToken(user.id);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      token,
    },
  });

  return;
});
