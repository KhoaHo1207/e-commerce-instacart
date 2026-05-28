import { Router } from "express";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
import {
  assignDeliveryPartner,
  createDeliveryPartner,
  getAdminStats,
  getDeliveryPartners,
  updateDeliveryPartner,
} from "../controllers/admin.controller.js";
import validate from "../middlewares/validate.middleware.js";
import {
  createDeliveryPartnerSchema,
  updateDeliveryPartnerSchema,
} from "../validators/admin/admin.schema.js";
const adminRoutes = Router();

adminRoutes.use(authMiddleware, isAdmin);

adminRoutes.get("/stats", getAdminStats);
adminRoutes.get("/delivery-partners", getDeliveryPartners);
adminRoutes.post(
  "/delivery-partners",
  validate(createDeliveryPartnerSchema),
  createDeliveryPartner
);
adminRoutes.put(
  "/delivery-partners/:id",
  validate(updateDeliveryPartnerSchema),
  updateDeliveryPartner
);
adminRoutes.post("/orders/:orderId/assign", assignDeliveryPartner);

export default adminRoutes;
