import type { Order } from "@/types";
import { CheckIcon, ClockIcon, PackageIcon, TruckIcon } from "lucide-react";

export default function OrderTimeLine({ order }: { order: Order }) {
  const allStatuses = [
    "Placed",
    "Confirmed",
    "Assigned",
    "Packed",
    "Out for Delivery",
    "Delivered",
  ];
  const currentIdx = allStatuses.indexOf(order.status);

  const statusIcons: any = {
    Placed: ClockIcon,
    Confirmed: CheckIcon,
    Assigned: TruckIcon,
    Packed: PackageIcon,
    "Out for Delivery": TruckIcon,
    Delivered: CheckIcon,
  };

  return (
    <div className="rounded-2xl bg-white p-6">
      <h2 className="text-app-green mb-6 text-lg font-semibold">
        Delivery Progress
      </h2>
      <div className="space-y-0">
        {allStatuses.map((status, i) => {
          const Icon = statusIcons[status] || PackageIcon;
          const isCompleted = i <= currentIdx;
          const isCurrent = i === currentIdx;

          const historyEntry = order.statusHistory.find(
            (h: any) => h.status === status,
          );

          return (
            <div key={status} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`flex-center size-9 shrink-0 rounded-full ${isCompleted ? "bg-app-green text-white" : "bg-app-cream text-app-text-light"} ${isCurrent ? "ring-app-green/20 ring-4" : ""}`}
                >
                  <Icon className="size-4" />
                </div>
                {i < allStatuses.length - 1 && (
                  <div
                    className={`h-12 w-0.5 ${i < currentIdx ? "bg-app-green" : "bg-app-border"}`}
                  />
                )}
              </div>
              <div className="pb-6">
                <p
                  className={`text-sm font-semibold ${isCompleted ? "text-app-green" : "text-app-text-light"}`}
                >
                  {status}
                </p>
                {historyEntry && (
                  <p className="text-app-text-light mt-0.5 text-xs">
                    {new Date(historyEntry.timestamp).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
