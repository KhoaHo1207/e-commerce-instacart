import { appPromoBannerData, assets } from "@/assets/assets";

export default function PromoBanner() {
  return (
    <section className="mx-auto my-14 max-w-7xl rounded-2xl bg-green-950 px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row xl:px-10">
        {/* Left Side Content */}
        <div className="text-center md:text-left">
          <h2 className="mb-3 font-serif text-3xl text-white sm:text-4xl">
            {appPromoBannerData.title}
          </h2>
          <p className="mb-6 max-w-md text-white/70">
            {appPromoBannerData.description}
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:justify-start">
            <button className="rounded-xl bg-white px-6 py-3 font-semibold text-green-950 hover:bg-orange-100">
              App Store
            </button>
            <button className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/20">
              Google Play
            </button>
          </div>
        </div>
        {/* Right Side Image */}
        <img
          src={assets.delivery_truck}
          alt="delivery_truck"
          className="max-w-60 object-contain lg:max-w-120 xl:pr-10"
          loading="lazy"
          width={500}
          height={500}
        />
      </div>
    </section>
  );
}
