import { heroSectionData } from "@/assets/assets";

export default function Feature() {
  return (
    <section className="border-app-border/80 rounded-xl border bg-white py-5">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {heroSectionData.hero_features.map((feature, index) => (
            <div
              className="flex items-center gap-3 py-3"
              key={feature.title + index}
            >
              <div className="bg-app-cream flex-center size-10 shrink-0 rounded-lg">
                <feature.icon className="size-5" />
              </div>
              <div>
                <p className="text-app-green text-sm font-semibold">
                  {feature.title}
                </p>
                <p className="text-app-text-light text-xs">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
