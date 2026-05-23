import { AlertOctagon, Compass } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="bg-app-cream min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="border-app-border relative w-full rounded-3xl border bg-white/80 p-10 shadow-[0_12px_40px_rgba(15,23,42,0.15)] backdrop-blur">
          <div className="flex-center bg-app-green/10 text-app-green mx-auto mb-4 h-16 w-16 rounded-2xl">
            <AlertOctagon className="size-8" />
          </div>
          <h1 className="text-app-green text-4xl font-semibold">
            Page Not Found
          </h1>
          <p className="text-app-text-light mt-3">
            We could not find the page you’re looking for. It may have been
            moved, renamed, or never created in the first place.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="bg-app-green hover:bg-app-green-dark rounded-xl px-6 py-3 text-sm font-semibold text-white transition"
            >
              Take me home
            </Link>
            <Link
              to="/products"
              className="border-app-green text-app-green hover:bg-app-green/5 rounded-xl border px-6 py-3 text-sm font-semibold transition"
            >
              Browse products
            </Link>
          </div>

          <div className="text-app-text-light mt-10 flex flex-col gap-2 text-left text-sm sm:text-base md:text-center">
            <p className="flex items-center justify-center gap-2">
              <Compass className="text-app-green size-4" />
              Try searching for a product or category from the main menu.
            </p>
            <p>
              Or head to “My Orders” if you were trying to track a purchase you
              already made.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
