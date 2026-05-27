import cors from "cors";
import express, { Request, Response } from "express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
//middlewares
import errorMiddleware from "./middlewares/error.middleware.js";
import notFoundMiddleware from "./middlewares/notFound.middleware.js";
//routes
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import uploadRoutes from "./routes/upload.route.js";
import orderRoutes from "./routes/order.route.js";
import addressRoutes from "./routes/address.route.js";

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Routes
app.get("/", (req: Request, res: Response) => {
  return res.send("Hello World");
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/uploads", uploadRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/addresses", addressRoutes);
app.use("/api/inngest", serve({ client: inngest, functions }));

//Middlewares
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
