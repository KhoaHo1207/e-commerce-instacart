import { dummyProducts } from "@/assets/assets";
import DummyReviewsSection from "@/components/dummy-reviews-section";
import SpinLoading from "@/components/loading/spin-loading";
import ProductCard from "@/components/product-card";
import useCart from "@/hooks/use-cart";
import type { Product } from "@/types";
import { handleMessageError } from "@/utils/error";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  HomeIcon,
  LeafIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  StarIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ProductPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [localQuantity, setLocalQuantity] = useState<number>(0);

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

  // const displayQuantity = inCart ? cartItem?.quantity : localQuantity;

  const categoryLabel = product?.category.replace(/-/g, " ");

  const handleAddToCart = () => {
    if (localQuantity <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }
    if (localQuantity + (cartItem?.quantity || 0) > product.stock) {
      toast.error(
        `Maximum ${product.stock - (cartItem?.quantity || 0)} items can be added to cart`,
      );
      return;
    }
    if (!inCart) {
      addToCart(product, localQuantity);
      toast.success(`${product.name} added to cart`);
    } else {
      updateQuantity(product._id, cartItem!.quantity + localQuantity);
      toast.success(`${product.name} added to cart`);
    }
    setLocalQuantity(0);
  };

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

              {/* Description */}
              <p className="text-app-text-light mb-6 text-sm leading-relaxed">
                {product?.description}
              </p>

              {/* Stock */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <span className="text-app-success flex items-center gap-1 text-sm">
                    <CheckIcon className="size-4" /> In Stock ({product.stock}{" "}
                    available)
                  </span>
                ) : (
                  <span className="text-app-error text-sm font-medium">
                    Out Of Stock
                  </span>
                )}
              </div>

              {/* Display the quantity in cart */}
              {inCart && (
                <div className="mb-6">
                  <span className="text-app-text-light text-sm font-medium">
                    In Cart: {cartItem?.quantity}
                  </span>
                </div>
              )}
              {/* Quantity + Add To Cart */}
              {product.stock > 0 && (
                <div className="flex items-center gap-3">
                  {/* Quantity */}
                  <div className="border-app-border flex items-center overflow-hidden rounded-xl border">
                    <button
                      className="hover:bg-app-cream p-3 transition-colors"
                      onClick={() => setLocalQuantity(localQuantity - 1)}
                      disabled={localQuantity <= 0}
                    >
                      <MinusIcon className="size-4" />
                    </button>
                    <span className="min-w-[40px] px-5 text-center text-sm font-semibold">
                      {localQuantity}
                    </span>
                    <button
                      className="hover:bg-app-cream p-3 transition-colors"
                      onClick={() => setLocalQuantity(localQuantity + 1)}
                    >
                      <PlusIcon className="size-4" />
                    </button>
                  </div>
                  {/* Add to Cart */}
                  <button
                    className="flex-center bg-app-orange hover:bg-app-orange-dark flex-1 gap-2 rounded-xl py-3 font-semibold text-white transition-colors active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCartIcon className="size-4" />
                    {inCart ? "Added to cart" : "Add to cart"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Customer Preview Section */}
        {product.reviewCount > 0 && <DummyReviewsSection product={product} />}
        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-12 mb-44">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex flex-col">
                <h2 className="text-2xl font-semibold">Related Products</h2>
                <p className="text-app-text-light mt-1 text-sm">
                  More from {categoryLabel}
                </p>
              </div>
              <Link
                to={`/products?category=${product.category}`}
                className="text-app-orange hover:text-app-orange-dark flex items-center gap-1 text-sm font-semibold transition-colors"
              >
                View All <ArrowRightIcon className="size-4" />
              </Link>
            </div>

            <div className="xl:gap- grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {relatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
