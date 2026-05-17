import Feature from "@/components/home/feature";
import Hero from "@/components/home/hero";
import HomeCategories from "@/components/home/home-categories";

export default function HomePage() {
  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Hero />
      <Feature />
      <HomeCategories />
    </div>
  );
}
