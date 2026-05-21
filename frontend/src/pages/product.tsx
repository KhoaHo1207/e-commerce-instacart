import { dummyProducts } from "@/assets/assets";
import SpinLoading from "@/components/loading/spin-loading";
import useCart from "@/hooks/use-cart";
import type { Product } from "@/types";
import { handleMessageError } from "@/utils/error";
import { ArrowLeftIcon, HomeIcon, LeafIcon, StarIcon } from "lucide-react";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ProductPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [localQuantity, setLocalQuantity] = useState<number>(1);

  const { id } = useParams<{ id: string }>();
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";
  const navigate = useNavigate();

  const { items, addToCart, updateQuantity, removeFromCart } = useCart();

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const product = dummyProducts.find((p) => p._id === id);
      if (!product) {
        toast.error("Product not found");
        navigate("/products");
        return;
      }
      setRelatedProducts(
        dummyProducts.filter(
          (p) => p._id !== id && p.category === product.category && p.stock > 0,
        ),
      );
      setProduct(product);
    } catch (error) {
      toast.error(handleMessageError(error));
    } finally {
      setLoading(false);
    }
  };

  const cartItem = items.find((item) => item?.product?._id === product?._id);
  const inCart = !!cartItem;

  const displayQuantity = inCart ? cartItem?.quantity : localQuantity;

  const categoryLabel = product?.category.replace(/-/g, " ");
  useEffect(() => {
    fetchProduct();
  }, [id, navigate]);

  if (loading) return <SpinLoading />;
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* BreadCrumb */}
        <nav className="text-app-text-light mb-6 flex items-center gap-2 text-sm">
          <Link to={"/"} className="hover:text-app-green transition-colors">
            <HomeIcon className="size-4" />
          </Link>
          <span>/</span>
          <Link
            to={"/products"}
            className="hover:text-app-green transition-colors"
          >
            Products
          </Link>
          <span>/</span>
          <Link
            to={`/products?category=${product?.category}`}
            className="hover:text-app-green capitalize transition-colors"
          >
            {categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-app-green max-w-[200px] truncate font-medium capitalize">
            {product?.name}
          </span>
        </nav>

        {/* Back Button */}
        <button
          className="text-app-text-light hover:text-app-green mb-6 flex items-center gap-1.5 text-sm transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon className="size-4" /> Back
        </button>

        {/* Product Details Section */}
        <div className="overflow-hidden rounded-2xl bg-white/50">
          <div className="grid gap-0 md:grid-cols-2">
            {/* Left side - Image */}
            <div className="flex-center relative min-h-[320px] p-8 md:min-h-[480px] md:p-12">
              <img
                src={product?.image}
                alt={product?.name}
                className="max-h-[360px] w-auto object-contain"
              />
              {/* Badges */}
              <div className="absolute top-5 left-5 flex flex-wrap gap-1.5">
                {product.isOrganic && (
                  <span className="bg-app-green flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold text-white">
                    <LeafIcon className="size-3" /> Organic
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="bg-app-orange rounded-full px-2.5 py-1 text-xs font-semibold text-white">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
            </div>
            {/* Right side - Details */}
            <div className="flex flex-col justify-center p-6 md:p-10">
              <span className="text-app-text-light mb-2 text-xs font-medium tracking-wider capitalize">
                {categoryLabel}
              </span>
              <h1 className="text-app-green mb-3 text-2xl font-semibold md:text-3xl">
                {product?.name}
              </h1>

              {/* Rating */}
              {product.rating > 0 && (
                <div className="mb-5 flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <StarIcon
                        key={index}
                        className={`size-4 ${index < product?.rating ? "text-app-warning fill-app-warning" : "text-app-border"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product?.rating}</span>
                  <span className="text-app-text-light text-sm">
                    ({product?.reviewCount}) reviews
                  </span>
                </div>
              )}

              {/* Prcie */}
              <div className="mb-5 flex items-baseline gap-3">
                <span className="text-app-green text-3xl font-semibold md:text-4xl">
                  {currency}
                  {product?.price.toFixed(2)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-app-text-light text-lg line-through">
                    {currency}
                    {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Customer Preview Section */}

        {/* Related Products Section */}
      </div>
    </div>
  );
}
