import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  updateOrder,
  getOrderLocation,
} from "../controller/order.controller.js";
import validate from "../middlewares/validate.middleware.js";
import {
  createOrderSchema,
  updateOrderSchema,
} from "../validators/order/order.schema.js";
const orderRoutes = Router();
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

orderRoutes.use(authMiddleware);

orderRoutes.post("/", validate(createOrderSchema), createOrder);
orderRoutes.get("/", getUserOrders);
orderRoutes.get("/all", isAdmin, getAllOrders);
orderRoutes.get("/:id", getOrderById);
orderRoutes.put("/:id/status", validate(updateOrderSchema), updateOrder);
orderRoutes.get("/:id/location", getOrderLocation);

export default orderRoutes;
