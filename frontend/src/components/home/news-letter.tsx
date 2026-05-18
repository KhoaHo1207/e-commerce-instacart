import { MailIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function Newsletter() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Subscribed to newsletter");
  };
  return (
    <section className="mx-auto mt-32 mb-20 rounded-3xl bg-white px-4 py-18 shadow-xs sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex-center mx-auto mb-6 size-16 rounded-xl bg-white shadow">
          <MailIcon className="text-app-green size-8" strokeWidth={1.5} />
        </div>

        <h2 className="text-app-green mb-4 text-3xl font-semibold">
          Subscribe to our Newsletter
        </h2>

        <p className="text-app-text-light mb-8 text-base">
          Get weekly updates on fresh produce, seasonal offers, and exclusive
          discounts right to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            className="border-app-border focus:border-app-green flex-1 rounded-xl border bg-white px-6 py-3.5 text-sm transition-all focus:ring"
            placeholder="Enter your email address"
            required
            aria-label="Your email address"
          />

          <button
            type="submit"
            className="bg-app-green hover:bg-app-green-light rounded-xl px-8 py-3.5 font-semibold whitespace-nowrap text-white shadow-sm transition-colors active:scale-[0.98]"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
