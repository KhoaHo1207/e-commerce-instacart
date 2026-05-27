import { Router } from "express";
import {
  addAddress,
  deleteAddress,
  gerAddresses,
  updateAddress,
} from "../controllers/address.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  addAddressSchema,
  updateAddressSchema,
} from "../validators/address/address.schema.js";

const addressRoutes = Router();

addressRoutes.use(authMiddleware);

addressRoutes.get("/", gerAddresses);
addressRoutes.post("/", validate(addAddressSchema), addAddress);
addressRoutes.put("/:id", validate(updateAddressSchema), updateAddress);
addressRoutes.delete("/:id", deleteAddress);

export default addressRoutes;
