import { dummyDeliveryPartnerData } from "@/assets/assets";
import Loading from "@/components/loading/loading-spin";
import { MailIcon, PhoneIcon, PlusIcon, TruckIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { DeliveryPartner } from "../../types";

export default function AdminDeliveryPartners() {
  const [partners, setPartners] = useState<DeliveryPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    vehicleType: "bike",
  });

  const fetchPartners = async () => {
    setPartners(dummyDeliveryPartnerData as any);
    setTimeout(() => setLoading(false), 1000);
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    console.log(id, isActive);
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-zinc-900">
          Delivery Partners
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-app-green hover:bg-app-green-light flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-colors"
        >
          <PlusIcon className="size-4" /> Add Partner
        </button>
      </div>

      {/* Partners Grid */}
      {partners.length === 0 ? (
        <div className="border-app-border rounded-2xl border bg-white py-16 text-center">
          <TruckIcon className="text-app-border mx-auto mb-3 size-12" />
          <p className="mb-1 text-lg font-semibold text-zinc-900">
            No delivery partners
          </p>
          <p className="text-sm text-zinc-500">
            Onboard your first partner to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {partners.map((p) => (
            <div
              key={p._id}
              className="border-app-border space-y-3 rounded-2xl border bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-app-green flex-center size-10 rounded-full">
                    <span className="text-sm font-semibold text-white">
                      {p.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      {p.name}
                    </p>
                    <p className="text-xs text-zinc-500 capitalize">
                      {p.vehicleType}
                    </p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${p.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                  {p.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="space-y-1.5 text-sm text-zinc-600">
                <p className="flex items-center gap-2">
                  <MailIcon className="h-3.5 w-3.5 text-zinc-400" /> {p.email}
                </p>
                <p className="flex items-center gap-2">
                  <PhoneIcon className="h-3.5 w-3.5 text-zinc-400" /> {p.phone}
                </p>
              </div>
              <button
                onClick={() => toggleActive(p._id, p.isActive)}
                className={`w-full rounded-lg py-2 text-xs font-medium transition-colors ${p.isActive ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-green-50 text-green-600 hover:bg-green-100"}`}
              >
                {p.isActive ? "Deactivate" : "Activate"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Partner Modal */}
      {showForm && (
        <>
          <div
            className="bg-app-cream/80 fixed inset-0 z-50 backdrop-blur"
            onClick={() => setShowForm(false)}
          />
          <div className="flex-center fixed inset-0 z-50 p-4">
            <form
              onSubmit={handleSubmit}
              className="animate-fade-in w-full max-w-lg rounded-2xl bg-white p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-app-green text-lg font-semibold">
                  Onboard Delivery Partner
                </h2>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="hover:bg-app-cream rounded-lg p-2"
                >
                  <XIcon className="size-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-app-green mb-1.5 block text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="border-app-border focus:border-app-green w-full rounded-xl border px-4 py-2.5 text-sm outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-app-green mb-1.5 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="border-app-border focus:border-app-green w-full rounded-xl border px-4 py-2.5 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-app-green mb-1.5 block text-sm font-medium">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      className="border-app-border focus:border-app-green w-full rounded-xl border px-4 py-2.5 text-sm outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-app-green mb-1.5 block text-sm font-medium">
                      Phone
                    </label>
                    <input
                      type="text"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="border-app-border focus:border-app-green w-full rounded-xl border px-4 py-2.5 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-app-green mb-1.5 block text-sm font-medium">
                      Vehicle Type
                    </label>
                    <select
                      value={form.vehicleType}
                      onChange={(e) =>
                        setForm({ ...form, vehicleType: e.target.value })
                      }
                      className="border-app-border focus:border-app-green w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none"
                    >
                      <option value="bike">Bike</option>
                      <option value="scooter">Scooter</option>
                      <option value="car">Car</option>
                    </select>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="bg-app-green hover:bg-app-green-light mt-6 w-full rounded-xl py-3 font-semibold text-white transition-colors disabled:opacity-60"
              >
                {saving ? "Creating..." : "Create Partner"}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
