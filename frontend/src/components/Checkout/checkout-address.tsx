import { ChevronRightIcon, MapPinIcon, PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

const CheckoutAddress = ({ user, address, setAddress, setStep }: any) => {
  return (
    <div className="animate-fade-in rounded-2xl bg-white p-6">
      <h2 className="text-app-green mb-5 flex items-center gap-2 text-lg font-semibold">
        <MapPinIcon className="size-5" /> Delivery Address
      </h2>
      {user?.addresses && user.addresses.length > 0 && (
        <div className="mb-6">
          <h3 className="text-app-green mb-3 text-sm font-semibold">
            Saved Addresses
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {user.addresses.map((addr: any) => (
              <div
                key={addr._id || addr.label}
                onClick={() =>
                  setAddress({
                    label: addr.label,
                    address: addr.address,
                    city: addr.city,
                    state: addr.state,
                    zip: addr.zip,
                    lat: addr.lat,
                    lng: addr.lng,
                  })
                }
                className={`cursor-pointer rounded-xl border p-4 transition-colors ${address.label === addr.label && address.address === addr.address ? "border-app-green bg-app-cream" : "border-app-border hover:bg-app-cream"}`}
              >
                <div className="mb-1 flex items-center gap-2">
                  <MapPinIcon className="text-app-green size-4" />
                  <span className="text-sm font-semibold text-zinc-900">
                    {addr.label}
                  </span>
                  {addr.isDefault && (
                    <span className="text-app-orange rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase">
                      Default
                    </span>
                  )}
                </div>
                <p className="truncate text-sm text-zinc-600">{addr.address}</p>
                <p className="text-xs text-zinc-500">
                  {addr.city}, {addr.state} {addr.zip}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      <Link
        to="/addresses"
        className="flex-center mt-6 gap-2 rounded-xl border border-gray-600 px-6 py-3 text-gray-600"
      >
        Add New Address <PlusIcon className="size-4" />
      </Link>
      <button
        onClick={() => {
          setStep("payment");
          scrollTo(0, 0);
        }}
        disabled={!address.address || !address.city}
        className="bg-app-green hover:bg-app-green-light mt-6 flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-colors disabled:opacity-50"
      >
        Continue to Payment <ChevronRightIcon className="size-4" />
      </button>
    </div>
  );
};

export default CheckoutAddress;
