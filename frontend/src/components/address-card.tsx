import type { Address } from "@/types";
import { CheckIcon, MapPinIcon, PencilIcon, Trash2Icon } from "lucide-react";

export default function AddressCard({
  addr,
  handleEdit,
  setAddresses,
}: {
  addr: Address;
  handleEdit: (addr: Address) => void;
  setAddresses: (addr: Address[]) => void;
}) {
  const handleDelete = async (id: string) => {
    console.log(id);
  };
  return (
    <div className="flex max-w-3xl items-start justify-between rounded-2xl bg-white p-6">
      {/* Left */}
      <div className="flex gap-4">
        <div className="bg-app-cream flex-center size-10 shrink-0 rounded-xl">
          <MapPinIcon className="text-app-green size-5" />
        </div>

        <div>
          <div className="mb-1 flex items-center gap-2">
            <p className="text-app-green text-sm font-semibold">{addr.label}</p>
            {addr.isDefault && (
              <span className="flex-center bg-app-green gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-medium text-white">
                <CheckIcon className="size-2.5" /> Default
              </span>
            )}
          </div>
          <p className="text-app-text-light text-sm">
            {addr.address}, {addr.city}, <br /> {addr.state}, {addr.zip}
          </p>
        </div>
      </div>
      {/* Right - Action buttons */}

      <div className="flex items-center gap-1">
        <button
          className="text-app-text-light hover:text-app-green hover:bg-app-cream rounded-lg p-2 transition-colors"
          onClick={() => handleEdit(addr)}
        >
          <PencilIcon className="size-4" />
        </button>

        <button
          className="text-app-text-light hover:text-app-error rounded-lg p-2 transition-colors hover:bg-red-50"
          onClick={() => handleDelete(addr._id)}
        >
          <Trash2Icon className="size-4" />
        </button>
      </div>
    </div>
  );
}
