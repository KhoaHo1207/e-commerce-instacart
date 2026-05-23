import { useState } from "react";
import { BikeIcon } from "lucide-react";
import { heroSectionData } from "@/assets/assets";

export default function DeliveryLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="bg-app-green relative hidden items-center justify-center lg:flex lg:w-1/2">
        <img
          src={heroSectionData.hero_image}
          alt=""
          className="absolute inset-0 h-full bg-center object-cover opacity-10"
        />
        <div className="relative px-12 text-center">
          <h2 className="mb-4 text-4xl font-semibold text-white">
            Delivery Partner Portal
          </h2>
          <p className="mx-auto max-w-sm font-serif text-xl text-white/60">
            Manage your deliveries and keep customers happy.
          </p>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="flex-center bg-app-cream flex-1 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="flex-center mb-4 gap-2">
              <BikeIcon className="text-app-green size-7" />
              <span className="text-app-green text-2xl font-semibold">
                Instacart
              </span>
            </div>
            <h1 className="text-app-green mb-2 text-2xl font-semibold">
              Delivery Partner Login
            </h1>
            <p className="text-app-text-light text-sm">
              Sign in to manage your deliveries
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl bg-white p-8"
          >
            <div>
              <label className="text-app-green mb-1.5 block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="not-focus:border-app-border w-full rounded-xl border px-4 py-2.5 text-sm transition-colors"
                placeholder="partner@example.com"
              />
            </div>
            <div>
              <label className="text-app-green mb-1.5 block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="not-focus:border-app-border w-full rounded-xl border px-4 py-2.5 text-sm transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-app-green hover:bg-app-green-light w-full rounded-xl py-3 font-semibold text-white transition-colors disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
