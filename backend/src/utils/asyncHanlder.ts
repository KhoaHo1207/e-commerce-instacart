import { Request, Response, NextFunction, RequestHandler } from "express";

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

const asyncHandler =
  (controller: AsyncController): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(controller(req, res, next)).catch(next);
  };

export default asyncHandler;
