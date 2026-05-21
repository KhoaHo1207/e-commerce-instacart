import { categoriesData, dummyProducts } from "@/assets/assets";
import FilterPanel from "@/components/filter-panel";
import SpinLoading from "@/components/loading/spin-loading";
import ProductCard from "@/components/product-card";
import ProductNotFound from "@/components/product-not-found";
import type { Product } from "@/types";
import { handleMessageError } from "@/utils/error";
import { ChevronDown, Home, SlidersHorizontal, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  const category = searchParams.get("category") || "";
  const organic = searchParams.get("organic") || "";
  const sort = searchParams.get("sort") || "";
  const page = Number(searchParams.get("page") || "1");
  const minPrice = Number(searchParams.get("minPrice") || "0");
  const maxPrice = Number(searchParams.get("maxPrice") || "0");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setProducts(
        dummyProducts.filter((p) => p.category === category || category === ""),
      );
    } catch (error) {
      toast.error(handleMessageError(error));
    } finally {
      setLoading(false);
    }
  };

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    if (key !== "pages") {
      newParams.delete("page");
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => setSearchParams({});

  const activeCategory = categoriesData.find((c) => c.slug === category);
  const hasFilters = Boolean(
    category || organic || sort || minPrice || maxPrice,
  );

  useEffect(() => {
    fetchProducts();
  }, [category, organic, sort, page, minPrice, maxPrice]);

  return (
    <div className="bg-app-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* BreadCrumb */}
        <nav className="text-app-text-light mb-6 flex items-center gap-2 text-sm">
          <Link to={"/"} className="hover:text-app-green transition-colors">
            <Home className="size-4" />
          </Link>
          <span>/</span>
          <span className="text-app-green font-medium">
            {activeCategory ? activeCategory.name : "All Products"}
          </span>
        </nav>

        <div className="flex gap-8 xl:gap-10">
          {/* Sidebar - Desktop */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 rounded-2xl bg-white p-4">
              <FilterPanel
                categories={categoriesData}
                category={category}
                minPrice={minPrice}
                maxPrice={maxPrice}
                updateFilter={updateFilter}
                clearFilters={clearFilters}
                hasFilters={hasFilters}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-app-green text-2xl font-semibold">
                  {activeCategory ? activeCategory.name : "All Products"}
                </h1>
                <p className="text-app-text-light mt-0.5 text-sm">
                  {products.length} products founds
                </p>
              </div>

              <div className="flex flex-col gap-3 lg:items-center">
                {/* Mobile filter toggle */}
                <button
                  className="border-app-border hover:bg-app-cream flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm transition-colors lg:hidden"
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                >
                  <SlidersHorizontal className="size-4" /> Filters
                </button>

                {/* Sort */}
                <div className="relative">
                  <select
                    name=""
                    id=""
                    value={sort}
                    onChange={(e) => updateFilter("sort", e.target.value)}
                    className="border-app-border focus:border-app-green cursor-pointer appearance-none rounded-xl border bg-white py-2 pr-8 pl-3 text-sm outline-none"
                  >
                    <option value="">Newest</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="name">A - Z</option>
                  </select>
                  <ChevronDown className="text-app-text-light pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {loading ? (
              <SpinLoading />
            ) : products.length === 0 ? (
              <ProductNotFound clearFilters={clearFilters} />
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-8">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex-center mt-16 gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    className={`size-9 rounded-lg text-sm font-medium transition-colors ${page === index + 1 ? "bg-app-green text-white" : "text-app-text-light hover:bg-app-cream bg-white"}`}
                    onClick={() => {
                      updateFilter("page", (index + 1).toString());
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    key={index}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {mobileFiltersOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          >
            <div className="animate-slide-in-up fixed right-0 bottom-0 left-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-white">
              <div className="border-app-border flex items-center justify-between border-b p-4">
                <h3 className="text-app-green text-lg font-semibold">
                  Filters
                </h3>
                <button
                  className="hover:bg-app-cream rounded-lg p-2"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <XIcon className="size-5" />
                </button>
              </div>

              <div className="p-4">
                <FilterPanel
                  categories={categoriesData}
                  category={category}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  updateFilter={updateFilter}
                  clearFilters={clearFilters}
                  hasFilters={hasFilters}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
