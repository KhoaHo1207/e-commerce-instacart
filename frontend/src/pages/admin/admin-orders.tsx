import { useState, useEffect } from "react";
import { TruckIcon } from "lucide-react";
import toast from "react-hot-toast";
import type { DeliveryPartner } from "../../types";
import Loading from "@/components/loading/loading-spin";
import {
  dummyDashboardOrdersData,
  dummyDeliveryPartnerData,
} from "@/assets/assets";

export default function AdminOrders() {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const [orders, setOrders] = useState<any[]>([]);
  const [partners, setPartners] = useState<DeliveryPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [assignModal, setAssignModal] = useState<string | null>(null);
  const [selectedPartner, setSelectedPartner] = useState("");

  const fetchOrders = async () => {
    setOrders(dummyDashboardOrdersData);
    setTimeout(() => setLoading(false), 1000);
  };

  const fetchPartners = async () => {
    setPartners(dummyDeliveryPartnerData as any);
    setTimeout(() => setLoading(false), 1000);
  };

  useEffect(() => {
    fetchOrders();
    fetchPartners();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    console.log(id, newStatus);
  };

  const handleAssign = async () => {
    if (!assignModal || !selectedPartner) return;
    toast.success("Delivery partner assigned!");
    setAssignModal(null);
    setSelectedPartner("");
  };

  const statusOptions = [
    "Placed",
    "Confirmed",
    "Assigned",
    "Packed",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];
  const statusColors: any = {
    Placed: "bg-blue-100 text-blue-800",
    Confirmed: "bg-amber-100 text-amber-800",
    Assigned: "bg-indigo-100 text-indigo-800",
    Packed: "bg-cyan-100 text-cyan-800",
    "Out for Delivery": "bg-purple-100 text-purple-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="border-app-border overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="border-app-border border-b px-6 py-5">
          <h2 className="text-xl font-semibold text-zinc-900">Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-app-cream/50 text-xs font-semibold text-zinc-500 uppercase">
              <tr>
                <th className="px-6 py-4">Order Details</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Delivery Partner</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-app-border divide-y">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-zinc-500"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order: any) => (
                  <tr
                    key={order._id}
                    className="transition-colors hover:bg-zinc-50/50"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-zinc-900">
                        #{order._id.slice(-6)}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-zinc-900">
                        {order.user?.name || "Unknown User"}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {order.user?.email || "No email"}
                      </p>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {currency}
                      {order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      {order.deliveryPartner ? (
                        <div className="flex items-center gap-2">
                          <div className="bg-app-green flex-center size-6 rounded-full">
                            <span className="text-[10px] font-semibold text-white">
                              {order.deliveryPartner.name?.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-zinc-900">
                              {order.deliveryPartner.name}
                            </p>
                            <p className="text-[10px] text-zinc-500">
                              {order.deliveryPartner.phone}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setAssignModal(order._id);
                            setSelectedPartner("");
                          }}
                          className="flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 transition-colors hover:bg-indigo-100"
                        >
                          <TruckIcon className="size-3" /> Assign
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className={`cursor-pointer rounded-lg border-r-8 border-transparent px-3 py-1.5 text-xs leading-tight font-semibold outline-none ${statusColors[order.status] || "bg-zinc-100 text-zinc-800"}`}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Modal */}
      {assignModal && (
        <>
          <div
            className="bg-app-cream/80 fixed inset-0 z-50 backdrop-blur"
            onClick={() => setAssignModal(null)}
          />
          <div className="flex-center fixed inset-0 z-50 p-4">
            <div className="animate-fade-in w-full max-w-sm rounded-2xl bg-white p-6">
              <h3 className="text-app-green mb-4 text-lg font-semibold">
                Assign Delivery Partner
              </h3>
              {partners.length === 0 ? (
                <p className="mb-4 text-sm text-zinc-500">
                  No active delivery partners. Please onboard a partner first.
                </p>
              ) : (
                <div className="mb-5 max-h-60 space-y-2 overflow-y-auto">
                  {partners.map((p) => (
                    <label
                      key={p._id}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors ${selectedPartner === p._id ? "border-app-green bg-app-green/5" : "border-app-border hover:bg-app-cream"}`}
                    >
                      <input
                        type="radio"
                        name="partner"
                        value={p._id}
                        checked={selectedPartner === p._id}
                        onChange={() => setSelectedPartner(p._id)}
                        className="text-app-green"
                      />
                      <div className="bg-app-green flex-center size-8 rounded-full">
                        <span className="text-xs font-semibold text-white">
                          {p.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900">
                          {p.name}
                        </p>
                        <p className="text-xs text-zinc-500 capitalize">
                          {p.vehicleType} • {p.phone}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => setAssignModal(null)}
                  className="flex-1 rounded-xl bg-zinc-100 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssign}
                  disabled={!selectedPartner}
                  className="bg-app-green hover:bg-app-green-light flex-1 rounded-xl py-2.5 text-sm font-medium text-white transition-colors disabled:opacity-50"
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
