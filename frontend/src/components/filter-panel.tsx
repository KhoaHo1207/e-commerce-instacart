import type { Category } from "@/types";

interface props {
  categories: Category[];
  category: string;
  minPrice: number;
  maxPrice: number;
  updateFilter: (key: string, value: string) => void;
  clearFilters: () => void;
  hasFilters: boolean;
}

export default function FilterPanel({
  categories,
  category,
  minPrice,
  maxPrice,
  updateFilter,
  clearFilters,
  hasFilters,
}: props) {
  const categoriesWithAll = [
    {
      slug: "",
      name: "All Categories",
    },
    ...categories,
  ];
  return (
    <div className="space-y-6">
      {/* Categories */}{" "}
      <div className="">
        <h3 className="text-app-green mb-3 text-sm font-semibold">
          Categories
        </h3>
        <div className="space-y-1.5">
          {categoriesWithAll.map((cat: Category) => (
            <button
              key={cat.slug}
              className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-all ${category === cat.slug ? "bg-app-green text-white" : "text-app-text-light hover:bg-app-cream"}`}
              onClick={() => updateFilter("category", cat.slug ?? "")}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
      {/* price Range */}
      <div>
        <h3 className="text-app-green mb-3 text-sm font-semibold">
          Price Range
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => updateFilter("minPrice", e.target.value)}
            className="not-focus:border-app-border w-full rounded-lg border bg-white px-3 py-2 text-sm"
          />

          <span>-</span>

          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => updateFilter("maxPrice", e.target.value)}
            className="not-focus:border-app-border w-full rounded-lg border bg-white px-3 py-2 text-sm"
          />
        </div>
      </div>
      {hasFilters && (
        <button
          className="text-app-error w-full rounded-lg py-2 text-sm font-medium transition-colors hover:bg-red-50"
          onClick={clearFilters}
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}
