import { dummyProducts } from "@/assets/assets";
import { ArrowRightIcon } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/product-card";

export default function PopularProducts() {
  const products = dummyProducts;

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => b.rating - a.rating).slice(0, 10);
  }, [products]);

  return (
    <section className="pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold">Popular Products</h2>
            <p className="text-app-text-light mt-1 text-sm">
              Top-rated products this season
            </p>
          </div>

          <Link
            to={`/products`}
            className="text-app-orange hover:text-app-orange-dark flex items-center gap-1 text-sm font-semibold transition-colors"
          >
            View All <ArrowRightIcon className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-8">
          {sortedProducts && sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="text-app-text-light col-span-full text-center text-sm">
              No products found
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
