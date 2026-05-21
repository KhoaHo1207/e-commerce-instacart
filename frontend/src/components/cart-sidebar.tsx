import useCart from "@/hooks/use-cart";
import {
  MinusIcon,
  PlusIcon,
  ShoppingBag,
  ShoppingBagIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CartSidebar() {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const {
    items,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const deliveryFee = cartTotal > 20 ? 0 : 1.99;

  const grandTotal = cartTotal + deliveryFee;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate(`/checkout`);
  };
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/40 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div className="animate-slide-in-right fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="border-app-border flex items-center justify-between border-b p-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-5" />
            <h2 className="text-lg font-medium">Your Cart</h2>
            <span className="bg-app-cream rounded-full px-2 py-0.5 text-xs font-semibold">
              {items.length} items
            </span>
          </div>

          <button
            className="hover:bg-app-cream rounded-xl p-2 transition-colors"
            onClick={() => setIsCartOpen(false)}
          >
            <XIcon className="size-5" />
          </button>
        </div>

        {/* Items */}

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBagIcon className="text-app-border mb-4 size-16" />
              <h3 className="mb-1 text-lg font-medium">Your cart is empty</h3>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product._id}
                className="bg-app-cream/60 flex gap-3 rounded-xl p-3"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="size-16 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-sm font-semibold">
                    {item.product.name}
                  </h4>
                  <p className="text-app-text-light text-xs">
                    {currency}
                    {item.product.price.toFixed(2)}/ {item.product.unit}
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <button
                        className="border-app-border flex-center size-7 rounded-lg border bg-white"
                        onClick={() =>
                          updateQuantity(item.product._id, item.quantity - 1)
                        }
                      >
                        <MinusIcon className="size-3" />
                      </button>

                      <span className="w-6 text-center text-sm font-medium">
                        {item.quantity}
                      </span>

                      <button
                        className="border-app-border flex-center size-7 rounded-lg border bg-white"
                        onClick={() =>
                          updateQuantity(item.product._id, item.quantity + 1)
                        }
                      >
                        <PlusIcon className="size-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">
                        {currency}
                        {(item.product.price * item.quantity).toFixed(2)}
                      </span>

                      <button
                        className="text-app-text-light hover:text-app-error p-1 transition-colors"
                        onClick={() => removeFromCart(item.product._id)}
                      >
                        <Trash2Icon className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-app-border space-y-3 border-t p-5">
            <div className="flex justify-between text-sm">
              <span className="text-app-text-light">Subtotal</span>
              <span className="font-medium">
                {currency}
                {cartTotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-app-text-light"> Delivery Fee</span>
              <span className="font-medium">
                {currency}
                {deliveryFee === 0 ? (
                  <span className="text-app-success">Free</span>
                ) : (
                  `${currency}${deliveryFee.toFixed(2)}`
                )}
              </span>
            </div>

            {deliveryFee > 0 && (
              <p className="text-app-text-light text-center text-xs">
                Free delivery on orders over {currency}20~
              </p>
            )}

            <div className="border-app-text-light flex justify-between border-t pt-3 text-base font-semibold">
              <span>Total</span>
              <span>
                {currency}
                {grandTotal.toFixed(2)}
              </span>
            </div>

            <button
              className="bg-app-orange hover:bg-app-orange-dark flex-center w-full gap-2 rounded-xl py-3 font-semibold text-white transition-colors active:scale-[0.98]"
              onClick={handleCheckout}
            >
              Proceed to checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
