import type { Address } from "@/types";
import { Loader2, XIcon } from "lucide-react";
import { useState } from "react";

export default function AddressForm({
  resetForm,
  handleSubmit,
  formData,
  setFormData,
  editingId,
}: {
  resetForm: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: Omit<Address, "_id">;
  setFormData: (data: Omit<Address, "_id">) => void;
  editingId: string | null;
}) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  return (
    <>
      {/* Overlay */}
      <div onClick={resetForm} className="*: fixed inset-0 z-50 bg-black/40" />
      {/* FormContainer */}
      <div className="flex-center fixed inset-0 z-50 p-4">
        <form
          onSubmit={handleSubmit}
          className="animate-fade-in w-full max-w-lg rounded-2xl bg-white p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Form Header */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-app-green text-lg font-semibold">
              {editingId ? "Edit Address" : "Add New Address"}
            </h2>
            <button
              type="button"
              onClick={resetForm}
              className="hover:bg-app-cream rounded-lg p-2"
            >
              <XIcon className="size-5" />
            </button>
          </div>

          {/* Form Input Field */}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="label"
                className="text-app-green mb-1.5 block text-sm font-medium"
              >
                Label
              </label>
              <input
                type="text"
                placeholder="Home, Work, etc."
                required
                aria-label="Address label"
                className="border-app-border focus:border-app-green w-full rounded-xl border px-4 py-2.5 text-sm outline-none"
                id="label"
                name="label"
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="text-app-green mb-1.5 block text-sm font-medium"
              >
                Street Address
              </label>
              <input
                type="text"
                placeholder="123 Main St"
                required
                aria-label="Street Address"
                className="border-app-border focus:border-app-green w-full rounded-xl border px-4 py-2.5 text-sm outline-none"
                id="address"
                name="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                disabled={isSubmitting}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="city"
                  className="text-app-green mb-1.5 block text-sm font-medium"
                >
                  City
                </label>
                <input
                  type="text"
                  placeholder="New York"
                  required
                  aria-label="City"
                  className="border-app-border focus:border-app-green w-full rounded-xl border px-4 py-2.5 text-sm outline-none"
                  id="city"
                  name="address"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="text-app-green mb-1.5 block text-sm font-medium"
                >
                  State
                </label>
                <input
                  type="text"
                  placeholder="NY"
                  required
                  aria-label="State"
                  className="border-app-border focus:border-app-green w-full rounded-xl border px-4 py-2.5 text-sm outline-none"
                  id="state"
                  name="address"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="zip"
                  className="text-app-green mb-1.5 block text-sm font-medium"
                >
                  Zip Code
                </label>
                <input
                  type="text"
                  placeholder="10001"
                  required
                  aria-label="Zip Code"
                  className="border-app-border focus:border-app-green w-full rounded-xl border px-4 py-2.5 text-sm outline-none"
                  id="zip"
                  name="address"
                  value={formData.zip}
                  onChange={(e) =>
                    setFormData({ ...formData, zip: e.target.value })
                  }
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex items-end pb-1">
                <label
                  htmlFor="isDefault"
                  className="text-app-green flex items-center gap-2 text-sm font-medium"
                >
                  <input
                    type="checkbox"
                    id="isDefault"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={(e) =>
                      setFormData({ ...formData, isDefault: e.target.checked })
                    }
                    disabled={isSubmitting}
                    className="border-app-border focus:border-app-green h-4 w-4 rounded-md border"
                  />
                  <span className="text-app-green cursor-pointer text-sm font-medium">
                    Set as default
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-app-green hover:bg-app-green-light mt-6 w-full rounded-xl py-3 font-semibold text-white transition-colors"
          >
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : editingId ? (
              "Update Address"
            ) : (
              "Save Address"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
