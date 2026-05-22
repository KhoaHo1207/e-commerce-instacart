import { dummyDashboardOrdersData, statusColors } from "@/assets/assets";
import LoadingSpin from "@/components/loading/loading-spin";
import useCart from "@/hooks/use-cart";
import type { Order } from "@/types";
import { handleMessageError } from "@/utils/error";
import { CalendarIcon, ChevronRightIcon, PackageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";

export default function MyOrderPage() {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState("all orders");
  const [searchParams, setSearchParams] = useSearchParams();

  const tabs = ["all orders", "placed", "out of delivery", "delivered"];

  const { clearCart } = useCart();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setOrders(dummyDashboardOrdersData as unknown as Order[]);
    } catch (error) {
      toast.error(handleMessageError(error));
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (searchParams.get("clearCart")) {
      clearCart();
      setSearchParams({});
      setTimeout(() => {
        fetchOrders();
      }, 2000);
    } else {
      fetchOrders();
    }
  }, [activeTab, searchParams, clearCart, setSearchParams]);

  return (
    <div className="bg-app-cream mb-20 min-h-screen">
      <div className="*: mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-app-green mb-6 text-2xl font-semibold">
          My Orders
        </h1>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`rounded-xl border px-4 py-2 text-sm font-medium capitalize transition-colors ${activeTab === tab ? "bg-app-green border-app-green text-white" : "text-app-text-light border-app-border hover:bg-app-cream bg-white"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Order List */}
        {loading ? (
          <LoadingSpin />
        ) : orders.length === 0 ? (
          <div className="py-16 text-center">
            <PackageIcon className="text-app-border mx-auto mb-4 size-16" />
            <h2 className="text-app-green mb-2 text-lg font-medium">
              No orders yet
            </h2>
            <p className="text-app-text-light mb-4 text-sm">
              Start shopping to see your orders here
            </p>
            <Link
              to={"/products"}
              className="bg-app-green inline-flex rounded-lg px-4 py-2 text-sm text-white"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order._id}
                to={`/order-tracking/${order._id}`}
                className="*: block max-w-4xl rounded-2xl bg-white p-5 transition-colors hover:shadow"
              >
                {/* Order id, Date & Status */}
                <div className="mb-3 flex items-start justify-between">
                  {/* Left */}
                  <div className="">
                    <p className="text-app-green mb-1 text-sm font-medium">
                      Order # {order._id.slice(-8).toUpperCase()}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <CalendarIcon className="text-app-text-light size-3" />
                      <span className="text-app-text-light text-xs">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  {/* Right */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-4 py-1 text-xs font-medium ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}
                    >
                      {order.status}
                    </span>
                    <ChevronRightIcon className="text-app-text-light size-4" />
                  </div>
                </div>
                {/* Item Thumbnails */}
                <div className="mb-3 flex items-center gap-2">
                  {order.items.slice(0, 4).map((item, index) => (
                    <img
                      src={item.image || ""}
                      alt={item.name}
                      key={index}
                      width={40}
                      height={40}
                      loading="lazy"
                      className="border-app-border size-12 rounded-lg border object-cover sm:size-16"
                    />
                  ))}
                  {order.items.length > 4 && (
                    <div className="bg-app-cream flex-center text-app-text-light size-12 rounded-lg text-xs font-semibold sm:size-16">
                      + {order.items.length - 4} more
                    </div>
                  )}
                </div>
                {/* Total Items & Price */}
                <div className="flex items-center justify-between pt-3 text-sm">
                  <span>{order.items.length} Items</span>

                  <span className="text-app-green font-semibold">
                    {currency}
                    {order.total.toFixed(2)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
