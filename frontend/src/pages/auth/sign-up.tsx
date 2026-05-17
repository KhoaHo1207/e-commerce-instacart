import { heroSectionData } from "@/assets/assets";
import type { SignUpFormData } from "@/types";
import { BikeIcon, EyeIcon, EyeOffIcon, Loader2, UserIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
  });
  setTimeout(() => window);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Fucking bitch");
    setLoading(true);
  };
  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="bg-app-green relative hidden items-center justify-center lg:flex lg:w-1/2">
        <img
          src={heroSectionData.hero_image}
          alt="hero_section"
          className="absolute inset-0 h-full bg-center object-cover opacity-10"
        />
        <div className="relative px-12 text-center">
          <h2 className="mb-4 text-4xl font-semibold text-white">
            Welcome back to Instacart
          </h2>
          <p className="mx-auto max-w-sm font-serif text-xl text-white/60">
            Fresh groceries and organic produce, delivered to your doorstep.
          </p>
        </div>
      </div>
      {/* Right Side */}

      <div className="flex-center bg-app-cream flex-1 px-4 py-12">
        <div className="w-full max-w-md">
          {/* Form Header Message */}
          <div className="mb-8 text-center">
            <Link to={"/"} className="mb-6 inline-flex items-center gap-2">
              <BikeIcon className="text-app-green size-8" />
              <span className="text-app-green text-2xl font-semibold">
                Instacart
              </span>
            </Link>

            <h1 className="text-app-green mb-2 text-2xl font-semibold">
              Sign in to your account
            </h1>

            <p>
              Don't have an account?{" "}
              <Link
                to={"/sign-up"}
                className="ml-1 font-semibold text-orange-500 transition-colors hover:text-orange-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Form */}

          <form onSubmit={handleSignUp} className="space-y-5">
            <label htmlFor="name" className="flex flex-col gap-1 text-sm">
              Name{" "}
              <div className="relative">
                <UserIcon className="text-app-text-light absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your name"
                  disabled={loading}
                  className="not-focus:border-app-border w-full rounded-xl border bg-white py-3 pr-4 pl-11 text-sm transition-all"
                  required
                  autoComplete="off"
                  aria-label="Your name here"
                />
              </div>
            </label>

            <label htmlFor="email" className="flex flex-col gap-1 text-sm">
              Email{" "}
              <div className="relative">
                <UserIcon className="text-app-text-light absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="you@example.com"
                  disabled={loading}
                  className="not-focus:border-app-border w-full rounded-xl border bg-white py-3 pr-4 pl-11 text-sm transition-all"
                  required
                  autoComplete="off"
                  aria-label="Your email here"
                />
              </div>
            </label>

            <label htmlFor="password" className="flex flex-col gap-1 text-sm">
              Password{" "}
              <div className="relative">
                <UserIcon className="text-app-text-light absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="············"
                  disabled={loading}
                  className="not-focus:border-app-border w-full rounded-xl border bg-white py-3 pr-4 pl-11 text-sm transition-all"
                  required
                  autoComplete="off"
                  aria-label="Your password here"
                />
                <button
                  type="button"
                  className="text-app-text-light absolute top-1/2 right-3 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeIcon className="size-4" />
                  ) : (
                    <EyeOffIcon className="size-4" />
                  )}
                </button>
              </div>
            </label>

            <button
              type="submit"
              className="flex-center bg-app-green hover:bg-app-green-light w-full rounded-xl py-3 font-semibold text-white transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Sign up"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
