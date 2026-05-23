import useCart from "@/hooks/use-cart";
import type { User } from "@/types";
import { cn } from "@/utils/cn";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ChevronDownIcon,
  LogOutIcon,
  MapPinIcon,
  MenuIcon,
  PackageIcon,
  SearchIcon,
  ShieldIcon,
  ShoppingCartIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "./logo";

export default function Navbar() {
  const NavItems = [
    {
      label: "Home",
      path: "/",
      className: "",
    },
    {
      label: "Products",
      path: "/products",
      className: "",
    },
    {
      label: "Deals",
      path: "/deals",
      className: "text-app-orange",
    },
  ];

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);

  const user: User = {
    name: "Khoa Ho",
    email: "khoa@gmail.com",
    isAdmin: true,
  };
  const { cartCount, setIsCartOpen } = useCart();

  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    } else {
      navigate(`/`);
    }
  };

  const handleLogout = () => {
    setUserMenuOpen(false);
    navigate("/");
  };

  //   const debouncedSearchQuery = useDebounce<string>(searchQuery, 500);

  //   useEffect(() => {
  //     if (!debouncedSearchQuery.trim()) return;

  //     console.log(debouncedSearchQuery);
  //   }, [debouncedSearchQuery]);

  return (
    <nav className="border-app-border sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo />

        <div className="flex w-full items-center justify-end gap-4 lg:gap-10">
          {/* Nav Links - Desktop */}
          <div className="hidden items-center gap-6 text-sm text-zinc-600 md:flex">
            {NavItems.map((item) => (
              <NavLink
                to={`${item.path}`}
                key={item.label}
                className={cn("", item.className)}
                aria-label={item.label}
                title={item.label}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="hidden max-w-sm flex-1 text-xs sm:flex sm:text-sm"
          >
            <div className="relative w-full">
              <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search for groceries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ring-app-orange/15 focus:ring-app-orange/30 w-full rounded-full bg-orange-50 p-2 pl-8 ring"
              />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <button
              className="relative rounded-xl p-2"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCartIcon className="size-5 text-zinc-900" />
              {cartCount > 0 && (
                <span className="bg-app-orange flex-center absolute -top-1 -right-1 size-4 rounded-full text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </button>
            {/* User */}
            <div className="relative cursor-pointer">
              {user ? (
                <div
                  className="flex items-center gap-2 p-2"
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                >
                  <div className="flex-center size-7 rounded-full bg-green-950 text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDownIcon className="size-3 text-zinc-500" />
                </div>
              ) : (
                <div className="flex-center gap-2">
                  <Link
                    to="/sign-in"
                    className="hover:bg-green-950-light hidden items-center gap-2 rounded-full bg-green-950 px-4 py-2 text-sm font-medium text-white transition-colors md:flex"
                  >
                    <UserIcon size={16} /> Sign In
                  </Link>
                  {userMenuOpen ? (
                    <XIcon
                      className="md:hidden"
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                    />
                  ) : (
                    <MenuIcon
                      className="md:hidden"
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                    />
                  )}
                </div>
              )}

              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="border-app-border animate-fade-in absolute right-0 z-50 mt-2.5 w-56 rounded-xl border bg-white py-2 shadow-lg">
                    {user && (
                      <div className="border-app-border border-b px-4 py-2">
                        <p className="text-sm font-medium text-zinc-900">
                          {user?.name}
                        </p>
                        <p className="text-xs text-zinc-500">{user?.email}</p>
                      </div>
                    )}

                    <button
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full"
                    >
                      {!user && (
                        <Link to={"/sign-in"} className="dropdown-link">
                          <UserIcon size={16} />
                          Sign In
                        </Link>
                      )}
                      {user && (
                        <Link to={"/my-orders"} className="dropdown-link">
                          <PackageIcon size={16} />
                          My Orders
                        </Link>
                      )}
                      {user && (
                        <Link to={"/address"} className="dropdown-link">
                          <MapPinIcon size={16} />
                          Addresses
                        </Link>
                      )}

                      <Link
                        to={"/products"}
                        className="dropdown-link md:hidden"
                      >
                        <ArrowRightIcon size={16} />
                        Products
                      </Link>
                      <Link to={"/deals"} className="dropdown-link md:hidden">
                        <ArrowUpRightIcon size={16} />
                        Deals
                      </Link>

                      {user?.isAdmin && (
                        <Link to={"/admin"} className="dropdown-link">
                          <ShieldIcon
                            size={16}
                            className="text-app-orange-dark"
                          />
                          <span className="text-app-orange-dark">
                            Admin Panel
                          </span>
                        </Link>
                      )}

                      {user && (
                        <div className="border-app-border border-t pt-1">
                          <button
                            className="text-app-error flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-all hover:bg-red-50"
                            onClick={handleLogout}
                          >
                            <LogOutIcon size={16} /> Logout
                          </button>
                        </div>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
