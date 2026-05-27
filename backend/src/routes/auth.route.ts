import { Router } from "express";
import validate from "../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "../validators/auth/auth.schema.js";
import { login, register } from "../controller/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/register", validate(registerSchema), register);
authRoutes.post("/login", validate(loginSchema), login);

export default authRoutes;
