import { dummyAddressData } from "@/assets/assets";
import AddressCard from "@/components/address-card";
import AddressForm from "@/components/address-form";
import LoadingSpin from "@/components/loading/loading-spin";
import type { Address } from "@/types";
import { handleMessageError } from "@/utils/error";
import { MapPinIcon, PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AddressPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Address>({
    label: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false,
  });

  const handleResetform = () => {
    setFormData({
      label: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      isDefault: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
    } catch (error) {
      toast.error(handleMessageError(error));
    }
  };

  const handleEdit = (add: Address) => {
    setEditingId(add._id);
    setFormData(add);
    setShowForm(true);
  };

  useEffect(() => {
    setAddresses(dummyAddressData);
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <div className="bg-app-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-app-green text-2xl font-semibold">
            My Addresses
          </h1>

          <button
            className="bg-app-green hover:bg-app-green-light flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-colors"
            onClick={() => setShowForm(true)}
          >
            <PlusIcon className="size-4" /> Add Address
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <AddressForm
            resetForm={handleResetform}
            handleSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
            editingId={editingId}
          />
        )}
        {/* Addresses List */}
        {loading ? (
          <LoadingSpin />
        ) : addresses.length === 0 ? (
          <div className="py-16 text-center">
            <MapPinIcon className="text-app-border mx-auto mb-4 size-16" />
            <h2 className="text-app-green mb-2 text-lg font-semibold">
              No addresses saved
            </h2>
            <p className="text-app-text-light text-sm">
              Add an address for faster checkout
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((add) => (
              <AddressCard
                key={add._id}
                addr={add}
                handleEdit={handleEdit}
                setAddresses={setAddresses}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
