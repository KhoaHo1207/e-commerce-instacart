interface props {
  clearFilters: () => void;
}

export default function ProductNotFound({ clearFilters }: props) {
  return (
    <div className="py-16 text-center">
      <p className="text-app-green mb-2 text-lg font-semibold">
        No products found
      </p>
      <p className="text-app-text-light mb-4 text-sm">
        Try adjusting your filters or search terms
      </p>
      <button
        className="bg-app-green hover:bg-app-green-light rounded-xl px-5 py-2 text-sm font-medium text-white transition-colors"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
}
