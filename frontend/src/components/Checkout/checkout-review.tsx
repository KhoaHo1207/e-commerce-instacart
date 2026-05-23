import { CheckIcon, TruckIcon } from "lucide-react";
import type { Address } from "../../types";

interface CheckoutReviewProps {
  address: Address;
  items: any[];
  handlePlaceOrder: () => void;
  loading: boolean;
  total: number;
}

export default function CheckoutReview({
  address,
  items,
  handlePlaceOrder,
  loading,
  total,
}: CheckoutReviewProps) {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  return (
    <div className="animate-fade-in rounded-2xl bg-white p-6">
      <h2 className="text-app-green mb-5 flex items-center gap-2 text-lg font-semibold">
        <CheckIcon className="size-5" /> Review Your Order
      </h2>

      {/* Delivery Info */}
      <div className="bg-app-cream mb-5 rounded-xl p-4">
        <div className="mb-2 flex items-center gap-2">
          <TruckIcon className="text-app-green size-4" />
          <span className="text-app-green text-sm font-semibold">
            Delivery Address
          </span>
        </div>
        <p className="text-app-text-light text-sm">
          {address.label} — {address.address}, {address.city}, {address.state}{" "}
          {address.zip}
        </p>
      </div>

      {/* Items */}
      <div className="mb-5 space-y-3">
        {items.map((item) => (
          <div key={item.product._id} className="flex items-center gap-3">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="size-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="text-app-green text-sm font-medium">
                {item.product.name}
              </p>
              <p className="text-app-text-light text-xs">
                Qty: {item.quantity}
              </p>
            </div>
            <span className="text-sm font-semibold">
              {currency}
              {(item.product.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="bg-app-orange hover:bg-app-orange-dark w-full rounded-xl py-3 font-semibold text-white transition-colors active:scale-[0.98] disabled:opacity-60"
      >
        {loading
          ? "Placing Order..."
          : `Place Order — ${currency}${total.toFixed(2)}`}
      </button>
    </div>
  );
}
