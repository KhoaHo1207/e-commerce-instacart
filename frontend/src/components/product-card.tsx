import useCart from "@/hooks/use-cart";
import type { Product } from "@/types";
import { Plus, Star } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }: { product: Product }) {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const { addToCart } = useCart();

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: Product,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const navigate = useNavigate();
  return (
    <div
      className={`group animate-fade-in relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow transition-all duration-300 hover:shadow-md ${
        product.stock === 0 ? "opacity-100" : ""
      }`}
      onClick={() => navigate(`/product/${product._id}`)}
    >
      {/* OUT OF STOCK */}
      {product.stock === 0 && (
        <>
          {/* <div className="absolute inset-0 z-10 bg-black/10 backdrop-blur-[1px]" /> */}

          {/* Ribbon */}
          <div className="absolute top-5 -right-10 z-20 rotate-45 bg-red-500 px-10 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-md">
            Out of stock
          </div>
        </>
      )}

      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className={`h-full w-full object-cover p-4 transition-all duration-300 ${
            product.stock === 0 ? "group-hover:p-2" : "group-hover:p-2"
          }`}
        />

        {/* Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.discount > 0 && (
            <span className="bg-app-orange rounded-full px-2 py-0.5 text-[10px] font-semibold text-white uppercase">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-3.5 text-zinc-700">
        <h3 className="mb-1.5 line-clamp-2 text-sm leading-snug">
          {product.name}
        </h3>

        {product.rating > 0 && (
          <div className="mb-2 flex items-center gap-1">
            <Star className="text-app-warning fill-app-warning size-3" />
            <span className="text-app-text text-xs font-medium">
              {product.rating}
            </span>
            <span className="text-app-text-light text-xs">
              ({product.reviewCount})
            </span>
          </div>
        )}
      </div>

      {/* Price + Add */}
      <div className="flex items-center justify-between p-4 pt-0">
        <div className="flex items-center gap-1 truncate">
          <span className="text-base font-medium">
            {currency}
            {product.price.toFixed(1)}
          </span>

          <span className="text-app-text-light block text-xs">
            /{product.unit}
          </span>

          {product.originalPrice > product.price && (
            <span className="text-app-text-light ml-1.5 text-xs line-through">
              {currency}
              {product.originalPrice.toFixed(1)}
            </span>
          )}
        </div>

        <button
          disabled={product.stock === 0}
          className="bg-app-orange flex-center hover:bg-app-orange-dark size-7 shrink-0 rounded-full text-white transition-colors active:scale-95 disabled:pointer-events-none disabled:bg-zinc-300"
          onClick={(e) => handleAddToCart(e, product)}
        >
          <Plus className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
