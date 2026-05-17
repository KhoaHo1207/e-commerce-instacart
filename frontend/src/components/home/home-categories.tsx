import { categoriesData } from "@/assets/assets";
import CategoryCarousel from "../carousel/category-carousel";

export default function HomeCategories() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl">
        <div>
          <h2 className="text-2xl font-semibold">Browse Categories</h2>
          <p className="text-app-text-light mt-1 text-sm">
            Find exactly what you need using
          </p>
        </div>

        <div className="mt-8 w-full overflow-hidden">
          <CategoryCarousel categories={categoriesData} />
        </div>
      </div>
    </section>
  );
}
