import { heroSectionData } from "@/assets/assets";
import { ArrowRightIcon, LeafIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative mb-10 flex min-h-[540px] items-center overflow-hidden rounded-3xl">
      <img
        src={heroSectionData.hero_image}
        alt="hero_image"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="from-app-green via-app-green/65 absolute inset-0 bg-linear-to-r to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-xl xl:pl-10">
          <span className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-orange-300/10 px-4 py-1.5 text-xs font-semibold text-orange-300">
            <LeafIcon className="size-3" /> Farm-Fresh & Organic
          </span>

          <h1 className="mb-5 font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            Nourish your home with{" "}
            <span className="text-orange-300">Earth's finest</span>
          </h1>

          <p className="mb-8 max-w-md text-base leading-relaxed text-white/70">
            {heroSectionData.description}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to={"/products"}
              className="flex-center gap-2 rounded-full bg-orange-400 px-7 py-3 font-semibold text-white transition-all hover:bg-orange-500 active:scale-[0.98]"
            >
              Shop Now <ArrowRightIcon className="size-4" />
            </Link>

            <Link
              to={"/categories"}
              className="rounded-full border border-white/20 bg-white/10 px-7 py-3 font-semibold text-white transition-all hover:bg-white/20"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
