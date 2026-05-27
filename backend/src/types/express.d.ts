import type { DeliveryPartner, User } from "../generated/prisma/client.ts";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      partner?: DeliveryPartner;
    }
  }
}

export {};
