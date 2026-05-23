import { Outlet, useNavigate } from "react-router-dom";
import { LogOutIcon, TruckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { DeliveryPartner } from "@/types";
import { dummyDeliveryPartnerData } from "@/assets/assets";

export default function DeliveryLayout() {
  const navigate = useNavigate();
  const [partner, setPartner] = useState<DeliveryPartner | null>(null);

  useEffect(() => {
    setPartner(dummyDeliveryPartnerData[0] as DeliveryPartner);
  }, [navigate]);

  const handleLogout = () => {
    navigate("/delivery/login");
  };

  if (!partner) return null;

  return (
    <div className="bg-app-cream min-h-screen">
      {/* Top Bar */}
      <header className="border-app-border sticky top-0 z-40 border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <TruckIcon className="text-app-green size-6" />
            <span className="text-app-green text-lg font-semibold">
              Instacart Delivery
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-zinc-600">
              {partner.name}
            </span>
            <button
              onClick={handleLogout}
              className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-red-50 hover:text-red-500"
            >
              <LogOutIcon className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
