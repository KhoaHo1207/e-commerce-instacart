import { Router } from "express";
import validate from "../middlewares/validate.middleware.js";
import {
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
  getProductByIdSchema,
  getProductsSchema,
} from "../validators/product/product.schema.js";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getFlashDeals,
} from "../controller/product.controller.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

const productRoutes = Router();

productRoutes.get("/flash-deals", getFlashDeals);
productRoutes.get("/", validate(getProductsSchema), getProducts);
productRoutes.get("/:id", validate(getProductByIdSchema), getProductById);
//Middleware for admin routes
productRoutes.use(authMiddleware, isAdmin);

productRoutes.post("/", validate(createProductSchema), createProduct);
productRoutes.put("/:id", validate(updateProductSchema), updateProduct);
productRoutes.delete("/:id", validate(deleteProductSchema), deleteProduct);

export default productRoutes;
