import { KeyRoundIcon } from "lucide-react";
import type { Order } from "@/types";

export default function OrderOTP({ order }: { order: Order }) {
  console.log(order);
  const showOtp =
    order.deliveryOtp &&
    ["Assigned", "Packed", "Out for Delivery"].includes(order.status);
  if (!showOtp) return null;
  return (
    <div className="from-app-green to-app-green-light rounded-2xl bg-linear-to-r p-6 text-white">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex-center size-10 rounded-full bg-white/15">
          <KeyRoundIcon className="size-5" />
        </div>
        <div>
          <h3 className="font-semibold">Delivery OTP</h3>
          <p className="text-xs text-white/70">
            Share this with your delivery partner
          </p>
        </div>
      </div>
      <div className="mt-2 flex gap-2">
        {order.deliveryOtp.split("").map((digit: string, i: number) => (
          <div
            key={i}
            className="flex-center h-13 w-11 rounded-xl bg-white/15 font-mono text-2xl font-bold tracking-wider"
          >
            {digit}
          </div>
        ))}
      </div>
    </div>
  );
}
