import { dummyProducts } from "@/assets/assets";
import SpinLoading from "@/components/loading/spin-loading";
import ProductCard from "@/components/product-card";
import type { Product } from "@/types";
import { handleMessageError } from "@/utils/error";
import { Zap } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function FlashDealPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setProducts(dummyProducts.filter((p) => p.stock > 0 && p.discount > 0));
    } catch (error) {
      toast.error(handleMessageError(error));
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-app-cream min-h-screen">
      {/* Banner */}
      <div className="from-app-orange to-app-orange-dark bg-linear-to-r py-10 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex-center mb-3 gap-2">
            <Zap className="size-6 fill-white" />
            <h1 className="text-3xl font-semibold">Flash Deals</h1>
            <Zap className="size-6 fill-white" />
          </div>

          <p className="mx-auto max-w-md text-white/80">
            Limited-time offers on your favorite organic products. Grab them
            before they're gone!
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <SpinLoading />
        ) : products.length === 0 ? (
          <div className="py-16 text-center">
            <Zap className="text-app-border mx-auto mb-4 size-16" />
            <h2 className="text-app-green mb-2 text-lg font-semibold">
              Np deals right now
            </h2>
            <p className="text-app-text-light text-sm">
              Check back soon for amazing offers!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
