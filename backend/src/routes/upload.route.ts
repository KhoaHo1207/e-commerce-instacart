import { Request, Response, Router } from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHanlder.js";

const uploadRoutes = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

uploadRoutes.post(
  "/",
  authMiddleware,
  isAdmin,
  upload.single("image"),
  asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {
      throw new ApiError(400, "No image file uploaded");
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data" + req.file.mimetype + ";base64," + b64;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "instacart",
      resource_type: "auto",
    });

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        url: result.secure_url,
      },
    });

    return;
  })
);

export default uploadRoutes;
