import Feature from "@/components/home/feature";
import Hero from "@/components/home/hero";
import HomeCategories from "@/components/home/home-categories";
import Newsletter from "@/components/home/news-letter";
import PopularProducts from "@/components/home/popular-product";
import PromoBanner from "@/components/home/promo-banner";

export default function HomePage() {
  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Hero />
      <Feature />
      <HomeCategories />
      <PopularProducts />
      <PromoBanner />
      <Newsletter />
    </div>
  );
}
