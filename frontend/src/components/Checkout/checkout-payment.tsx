import { ChevronRightIcon, CreditCardIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface CheckoutPaymentProps {
  setStep: Dispatch<SetStateAction<string>>;
  paymentMethod: string;
  setPaymentMethod: Dispatch<SetStateAction<string>>;
}

export default function CheckoutPayment({
  setStep,
  paymentMethod,
  setPaymentMethod,
}: CheckoutPaymentProps) {
  return (
    <div className="animate-fade-in rounded-2xl bg-white p-6">
      <h2 className="text-app-green mb-5 flex items-center gap-2 text-lg font-semibold">
        <CreditCardIcon className="size-5" /> Payment Method
      </h2>
      <div className="space-y-3">
        {[
          {
            value: "card",
            label: "Credit / Debit Card",
            desc: "Pay securely with your card",
          },
          {
            value: "cash",
            label: "Cash on Delivery",
            desc: "Pay when you receive",
          },
        ].map((method) => (
          <label
            key={method.value}
            className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all ${paymentMethod === method.value ? "border-app-green bg-app-cream" : "border-app-border hover:border-app-green-lighter"}`}
          >
            <input
              type="radio"
              name="payment"
              value={method.value}
              checked={paymentMethod === method.value}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="text-app-green size-4"
            />
            <div>
              <p className="text-app-green text-sm font-semibold">
                {method.label}
              </p>
              <p className="text-app-text-light text-xs">{method.desc}</p>
            </div>
          </label>
        ))}
      </div>
      <button
        onClick={() => {
          setStep("review");
          scrollTo(0, 0);
        }}
        className="bg-app-green hover:bg-app-green-light mt-6 flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-colors"
      >
        Review Order <ChevronRightIcon className="size-4" />
      </button>
    </div>
  );
}
