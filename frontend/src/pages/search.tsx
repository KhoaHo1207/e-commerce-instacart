import { dummyProducts } from "@/assets/assets";
import LoadingSpin from "@/components/loading/loading-spin";
import ProductCard from "@/components/product-card";
import type { Product } from "@/types";
import { Home, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function SearchResultPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();

  const query = searchParams.get("keyword") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setProducts(
          dummyProducts.filter(
            (p) =>
              p.name.toLowerCase().includes(query.toLowerCase()) ||
              p.category.toLowerCase().includes(query.toLowerCase()),
          ),
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [query]);

  return (
    <div className="bg-app-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* BreadCrumb */}
        <nav className="text-app-text-light mb-6 flex items-center gap-2 text-sm">
          <Link to={"/"} className="hover:text-app-green transition-colors">
            <Home className="size-4" />
          </Link>
          <span>/</span>
          <span className="text-app-green font-medium">Search Results</span>
        </nav>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-app-green mb-1 text-2xl font-semibold">
            Results for "{query}"
          </h1>
          <p>
            {loading ? (
              <span>Searching...</span>
            ) : (
              <span>{products.length} results found</span>
            )}
          </p>
        </div>
        {/* Results */}
        {loading ? (
          <LoadingSpin />
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <Search className="szie-16 text-app-border mx-auto mb-4" />
            <h2 className="text-app-green mb-2 text-xl font-semibold">
              No results found
            </h2>
            <p className="text-app-text-light mx-auto mb-6 max-w-md text-sm">
              We couldn't find any products matching "${query}". Try a different
              search term.
            </p>
            <Link
              to={"/products"}
              className="bg-app-green inline-flex rounded-lg px-5 py-2.5 text-sm font-medium text-white"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
