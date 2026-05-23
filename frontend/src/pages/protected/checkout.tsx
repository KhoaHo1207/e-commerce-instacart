import { dummyAddressData } from "@/assets/assets";
import CheckoutAddress from "@/components/Checkout/checkout-address";
import CheckoutPayment from "@/components/Checkout/checkout-payment";
import CheckoutReview from "@/components/Checkout/checkout-review";
import useCart from "@/hooks/use-cart";
import type { Address } from "@/types";
import {
  ArrowLeft,
  CheckIcon,
  ChevronRightIcon,
  CreditCardIcon,
  MapPinIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckOutPage() {
  const [step, setStep] = useState<string>("address");
  const [loading, setLoading] = useState<boolean>(false);
  const [address, setAddress] = useState<Address>({
    _id: "",
    label: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false,
    lat: 0,
    lng: 0,
  });
  const [paymentMethod, setPaymentMethod] = useState<string>("card");

  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";
  const { user } = {
    user: {
      addresses: dummyAddressData,
    },
  };
  const { items, cartTotal } = useCart();

  const deliveryFee = cartTotal > 20 ? 0 : 1.99;

  const tax = cartTotal * 0.08;
  const total = cartTotal + deliveryFee + tax;

  const steps: { key: string; label: string; icon: typeof MapPinIcon }[] = [
    {
      key: "address",
      label: "Address",
      icon: MapPinIcon,
    },
    {
      key: "payment",
      label: "Payment",
      icon: CreditCardIcon,
    },
    {
      key: "review",
      label: "Review",
      icon: CheckIcon,
    },
  ];

  const handlePlaceOrder = async () => {
    setLoading(true);
    navigate("/my-orders");
  };

  // Popoulate address from user's default address

  useState(() => {
    if (user?.addresses?.length > 0) {
      const defaultAddr = user.addresses.find(
        (a) => a.isDefault || user.addresses[0],
      );
      setAddress({
        _id: defaultAddr?._id || "",
        label: defaultAddr?.label || "",
        address: defaultAddr?.address || "",
        city: defaultAddr?.city || "",
        state: defaultAddr?.state || "",
        zip: defaultAddr?.zip || "",
        lat: defaultAddr?.lat || 0,
        lng: defaultAddr?.lng || 0,
      });
    }
  });

  if (items.length === 0) {
    return (
      <div className="bg-app-cream flex-center min-h-screen">
        <div className="text-center">
          <h2 className="text-app-green mb-2 text-xl font-semibold">
            Your cart is empty
          </h2>

          <p className="text-app-text-light mb-4 text-sm">
            Add some products to checkout
          </p>
          <button
            className="bg-app-green hover:bg-app-green-light rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-colors"
            onClick={() => navigate("/products")}
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-app-cream min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          className="text-app-text-light hover:text-app-green mb-6 flex items-center gap-3 text-sm transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="size-4" /> Back
        </button>

        <h1 className="*: text-app-green mb-8 text-2xl font-semibold">
          Checkout
        </h1>

        {/* Steps */}
        <div className="mb-8 flex items-center gap-2">
          {steps.map((s, index) => (
            <div key={index} className="flex items-center gap-2">
              <button
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${step === s.key ? "bg-app-green text-white" : "text-app-text-light bg-white"}`}
                onClick={() => setStep(s.key)}
              >
                <s.icon className="size-4" /> {s.label}
                {index < steps.length - 1 && (
                  <ChevronRightIcon className="text-app-text-light size-4" />
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Form */}
          <div className="md:col-span-2">
            {step === "address" && (
              <CheckoutAddress
                user={user}
                address={address}
                setAddress={setAddress}
                setStep={setStep}
              />
            )}

            {step === "payment" && (
              <CheckoutPayment
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                setStep={setStep}
              />
            )}

            {step === "review" && (
              <CheckoutReview
                address={address}
                items={items}
                handlePlaceOrder={handlePlaceOrder}
                loading={loading}
                total={total}
              />
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="sticky top-24 h-fit rounded-2xl bg-white p-5">
            <h3 className="text-app-green mb-4 text-sm font-semibold">
              Order Summary
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-app-text-light">
                  Subtotal ({items.length} items)
                </span>
                <span>
                  {currency}
                  {cartTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-app-text-light">Delivery Fee</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-app-success">Free</span>
                  ) : (
                    `${currency}${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-app-text-light">Tax</span>
                <span>
                  {currency}
                  {tax.toFixed(2)}
                </span>
              </div>

              <div className="border-app-border flex justify-between border-t pt-3 text-base font-semibold">
                <span>Total</span>
                <span className="text-app-green">
                  {currency}
                  {total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
