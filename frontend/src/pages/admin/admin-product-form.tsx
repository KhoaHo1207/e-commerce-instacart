import { categoriesData, dummyProducts } from "@/assets/assets";
import Loading from "@/components/loading/loading-spin";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function AdminProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    image: "",
    category: "",
    unit: "",
    stock: "",
    isOrganic: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (isEdit) {
        setFormData(() => dummyProducts.find((p) => p._id === id) as any);
      }
      setLoading(false);
    };
    fetchData();
  }, [id, isEdit]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="border-app-border overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="border-app-border flex items-center gap-4 border-b px-6 py-5">
          <Link
            to="/admin/products"
            className="rounded-lg bg-zinc-100 p-2 text-zinc-500 transition-colors hover:bg-zinc-200"
          >
            <ArrowLeftIcon className="size-5" />
          </Link>
          <h2 className="text-xl font-semibold text-zinc-900">
            {isEdit ? "Edit Product" : "New Product"}
          </h2>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Name
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="focus:border-app-green focus:ring-app-green w-full rounded-lg border border-zinc-200 px-4 py-2.5 transition-all outline-none focus:ring-1"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Category
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="focus:border-app-green focus:ring-app-green w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 transition-all outline-none focus:ring-1"
                >
                  <option value="">Select a category</option>
                  {categoriesData.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Price ($)
                </label>
                <input
                  required
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="focus:border-app-green focus:ring-app-green w-full rounded-lg border border-zinc-200 px-4 py-2.5 transition-all outline-none focus:ring-1"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Original Price ($) - Optional
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.originalPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, originalPrice: e.target.value })
                  }
                  className="focus:border-app-green focus:ring-app-green w-full rounded-lg border border-zinc-200 px-4 py-2.5 transition-all outline-none focus:ring-1"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Unit
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g., kg, piece, liter"
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                  className="focus:border-app-green focus:ring-app-green w-full rounded-lg border border-zinc-200 px-4 py-2.5 transition-all outline-none focus:ring-1"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Stock
                </label>
                <input
                  required
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  className="focus:border-app-green focus:ring-app-green w-full rounded-lg border border-zinc-200 px-4 py-2.5 transition-all outline-none focus:ring-1"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Product Image
                </label>
                <div className="flex items-center gap-4">
                  {(imageFile || formData.image) && (
                    <div className="bg-app-cream size-16 shrink-0 overflow-hidden rounded-lg border border-zinc-200">
                      <img
                        src={
                          imageFile
                            ? URL.createObjectURL(imageFile)
                            : formData.image
                        }
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="focus:border-app-green file:bg-app-orange w-full cursor-pointer rounded-lg border border-zinc-200 px-4 py-2.5 transition-all outline-none file:mr-4 file:rounded-lg file:border-0 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-orange-600"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="focus:border-app-green focus:ring-app-green w-full resize-none rounded-lg border border-zinc-200 px-4 py-2.5 transition-all outline-none focus:ring-1"
                />
              </div>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="isOrganic"
                  className="cursor-pointer text-sm font-medium text-zinc-700"
                >
                  Organic
                </label>
                <input
                  type="checkbox"
                  id="isOrganic"
                  checked={formData.isOrganic}
                  onChange={(e) =>
                    setFormData({ ...formData, isOrganic: e.target.checked })
                  }
                  className="text-app-green focus:ring-app-green size-5 cursor-pointer rounded border-zinc-300"
                />
              </div>
            </div>

            <div className="border-app-border flex justify-end border-t pt-6">
              <button
                disabled={saving}
                type="submit"
                className="bg-app-orange rounded-lg px-6 py-2.5 font-medium text-white transition-colors hover:bg-orange-600 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Product"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
