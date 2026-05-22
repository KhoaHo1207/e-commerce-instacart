import { dummyDashboardOrdersData, statusColors } from "@/assets/assets";
import LoadingSpin from "@/components/loading/loading-spin";
import LiveMap from "@/components/OrderTracking/live-map";
import OrderOTP from "@/components/OrderTracking/order-otp";
import OrderTimeLine from "@/components/OrderTracking/order-timeline";
import type { Order } from "@/types";
import { handleMessageError } from "@/utils/error";
import { ArrowLeftIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function OrderTrackingPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [liveLocation, setLiveLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setOrder(
        dummyDashboardOrdersData.find(
          (order) => order._id === id,
        ) as unknown as Order,
      );
    } catch (error) {
      toast.error(handleMessageError(error));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, [id, navigate]);

  if (loading) {
    return <LoadingSpin />;
  }

  if (!order) {
    toast.error("Order not found");
    navigate("/my-orders");
    return;
  }
  return (
    <div className="bg-app-cream mb-20 min-h-screen">
      <div className="*: *: mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <button
          onClick={() => navigate("/my-orders")}
          className="text-app-text-light hover:text-app-green mb-6 flex items-center gap-2 text-sm transition-colors"
        >
          <ArrowLeftIcon className="size-4" /> Back to Orders
        </button>
        {/* Order Id, Date, Status */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-app-green text-2xl font-semibold">
              Order #{order?._id.slice(-8).toUpperCase()}
            </h1>
            <p className="text-app-text-light mt-1 text-sm">
              Placed on{" "}
              {new Date(order?.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <span
            className={`${statusColors[order!.status]} rounded-full px-4 py-1 text-xs font-medium`}
          >
            {order!.status}
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Side - Timeline + Map Area */}
          <div className="space-y-6 lg:col-span-2">
            {/* OTP Card */}
            <OrderOTP order={order} />
            {/* Live Tracking Map */}
            <LiveMap order={order} liveLocation={liveLocation} />
            {/* Progress Bar */}
            <OrderTimeLine order={order} />
            {/* Delivery person */}
            {order?.deliveryPartner &&
              order.status !== "Delivered" &&
              order.status !== "Cancelled" && (
                <div className="flex items-center justify-between rounded-2xl bg-white p-5">
                  <div className="flex items-center gap-3">
                    <div className="bg-app-green flex-center size-11 rounded-full">
                      <span className="text-sm font-semibold text-white">
                        {order.deliveryPartner.name?.charAt(0)}
                      </span>
                    </div>

                    <div>
                      <p className="text-app-green text-sm font-semibold">
                        {order.deliveryPartner.name}
                      </p>
                      <p className="text-app-text-light text-xs capitalize">
                        {order.deliveryPartner.vehicleType} &#x2022; Delivery
                        Partner
                      </p>
                    </div>
                  </div>
                  <span className="flex-center gap-2">
                    <span className="text-app-green text-sm font-semibold">
                      {order.deliveryPartner.phone}
                    </span>
                    <a
                      href={`tel:${order.deliveryPartner.phone}`}
                      className="bg-app-cream hover:bg-app-cream-dark rounded-xl p-2.5 transition-colors"
                    >
                      <PhoneIcon className="text-app-error size-4" />
                    </a>
                  </span>
                </div>
              )}
          </div>

          {/* Right Side - Order Details */}

          <div className="space-y-5">
            {/* Delivery Address */}{" "}
            <div className="rounded-2xl bg-white p-5">
              <h3 className="text-app-green mb-3 flex items-center gap-2 text-sm font-semibold">
                <MapPinIcon className="size-4" /> Delivery Address
              </h3>

              <p className="text-app-text-light text-sm leading-relaxed">
                {order?.shippingAddress.label} <br />{" "}
                {order?.shippingAddress.address} <br />{" "}
                {order?.shippingAddress.city}, {order?.shippingAddress.state}{" "}
                {order?.shippingAddress.zip}
              </p>
            </div>
            {/* Items */}
            <div className="rounded-2xl bg-white p-5">
              <h3 className="text-app-green mb-3 text-sm font-semibold">
                Items ({order?.items.length})
              </h3>

              <div className="space-y-3">
                {order?.items.map((item, index) => (
                  <div className="flex items-center gap-3" key={index}>
                    <img
                      src={item.image}
                      alt={item.name}
                      width={40}
                      height={40}
                      loading="lazy"
                      className="border-app-border size-10 rounded-lg border object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-app-green truncate text-sm font-medium">
                        {item.name}
                      </p>
                      <p className="text-app-text-light text-xs">
                        x {item.quantity}
                      </p>
                    </div>
                    {/* Price */}
                    <span className="text-app-green text-sm font-semibold">
                      {currency}
                      {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-app-border mt-4 space-y-1.5 border-t pt-3 text-sm">
                {/* Subtotal */}
                <div className="flex justify-between">
                  <span className="text-app-text-light">Subtotal</span>
                  <span>
                    {currency}
                    {order?.subtotal.toFixed(2)}
                  </span>
                </div>

                {/* Delivery Fee */}
                <div className="flex justify-between">
                  <span className="text-app-text-light">Delivery Fee</span>
                  <span>
                    {order?.deliveryFee === 0
                      ? "Free"
                      : `${currency}${order?.deliveryFee.toFixed(2)}`}
                  </span>
                </div>

                {/* Tax */}
                <div className="flex justify-between">
                  <span className="text-app-text-light">Tax</span>
                  <span>
                    {currency}
                    {order?.tax.toFixed(2)}
                  </span>
                </div>

                {/* Total */}
                <div className="border-app-border text-app-green flex justify-between border-t pt-2 font-semibold">
                  <span>Total</span>
                  <span>
                    {currency}
                    {order?.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
