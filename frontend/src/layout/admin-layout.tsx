import { NavLink, Outlet } from "react-router-dom";
import {
  PlusIcon,
  PackageSearchIcon,
  ShoppingBagIcon,
  LogOutIcon,
  BarChart3Icon,
  ShieldIcon,
  Truck,
} from "lucide-react";
import Navbar from "@/components/navbar";

export default function AdminLayout() {
  const AdminLinkData = [
    { to: "/admin", label: "Dashboard", icon: BarChart3Icon },
    { to: "/admin/products/new", label: "Add Product", icon: PlusIcon },
    { to: "/admin/products", label: "Products", icon: PackageSearchIcon },
    { to: "/admin/orders", label: "Orders", icon: ShoppingBagIcon },
    { to: "/admin/delivery-partners", label: "Delivery Partners", icon: Truck },
    { to: "/", label: "Exit", icon: LogOutIcon },
  ];

  return (
    <div className="h-screen overflow-hidden">
      <div className="max-lg:hidden">
        <Navbar />
      </div>
      <div className="animate-fade-in mx-auto flex h-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:px-8">
        {/* Admin Sidebar */}
        <aside className="border-app-border h-fit w-full shrink-0 rounded-2xl border bg-white p-4 lg:w-64">
          <div className="border-app-border mb-4 border-b pb-4">
            <h2 className="text-app-green flex items-center gap-2 px-2 text-lg font-semibold">
              <ShieldIcon className="size-5 text-green-900" /> Admin Panel
            </h2>
          </div>
          <nav className="flex flex-col gap-1.5">
            {AdminLinkData.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={true}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md p-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-app-green text-white"
                      : "text-app-text-light hover:bg-orange-50 hover:text-zinc-900"
                  }`
                }
              >
                <link.icon className="size-4" /> {link.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="no-scrollbar flex-1 overflow-y-auto pb-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
