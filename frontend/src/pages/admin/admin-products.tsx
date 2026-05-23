import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusIcon, EditIcon, XIcon } from "lucide-react";
import type { Product } from "../../types";
import Loading from "@/components/loading/loading-spin";
import { dummyProducts } from "@/assets/assets";

export default function AdminProducts() {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setProducts(dummyProducts);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleMarkOutOfStock = async (id: string, name: string) => {
    if (
      !window.confirm(
        `Are you sure you want to mark "${name}" as out of stock?`,
      )
    )
      return;
    console.log(id);
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="border-app-border overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="border-app-border flex flex-wrap items-center justify-between gap-4 border-b px-6 py-5">
          <h2 className="text-xl font-semibold text-zinc-900">Products</h2>
          <Link
            to="/admin/products/new"
            className="bg-app-green flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-950"
          >
            <PlusIcon className="size-4" /> Add Product
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-app-cream/50 text-xs font-semibold text-zinc-500 uppercase">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-app-border divide-y">
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-zinc-500"
                  >
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="transition-colors hover:bg-zinc-50/50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="size-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-semibold text-zinc-900">
                            {product.name}
                          </p>
                          <p className="text-xs text-zinc-500">
                            {product.category || "Uncategorized"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {currency}
                      {product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                      >
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : "Out of stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/products/${product._id}/edit`}
                          className="hover:text-app-orange rounded-lg bg-zinc-100 p-2 text-zinc-500 transition-colors hover:bg-orange-50"
                        >
                          <EditIcon className="size-4" />
                        </Link>
                        <button
                          onClick={() =>
                            handleMarkOutOfStock(product._id, product.name)
                          }
                          title="Mark Out of Stock"
                          className="rounded-lg bg-zinc-100 p-2 text-zinc-500 transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                          <XIcon className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
