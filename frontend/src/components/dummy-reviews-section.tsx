import { useMemo } from "react";
import type { Product } from "@/types";
import { StarIcon, ThumbsUpIcon } from "lucide-react";

/* ─── Dummy Reviews Section ─── */
const REVIEWERS = [
  { name: "Ananya S.", avatar: "AS" },
  { name: "Rahul M.", avatar: "RM" },
  { name: "Priya K.", avatar: "PK" },
  { name: "Vikram J.", avatar: "VJ" },
  { name: "Meera D.", avatar: "MD" },
  { name: "Arjun R.", avatar: "AR" },
  { name: "Sneha T.", avatar: "ST" },
  { name: "Karan P.", avatar: "KP" },
];

const COMMENTS = [
  "Absolutely love this product! Fresh and great quality. Will definitely order again.",
  "Good value for the price. Packaging was neat and delivery was on time.",
  "Quality is decent but I expected it to be a bit fresher. Still a solid buy overall.",
  "This has become a staple in my kitchen now. Highly recommended for everyone!",
  "Exceeded my expectations. The taste and freshness were top-notch. Five stars!",
  "Pretty good! Not the absolute best I've had, but definitely worth the price.",
  "Arrived in perfect condition. Very satisfied with the purchase, ordering more soon.",
  "Great product, my family loved it. The organic quality really shows in the taste.",
];

function seededRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++)
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  return () => {
    h = (h ^ (h >>> 16)) * 0x45d9f3b;
    h = (h ^ (h >>> 16)) * 0x45d9f3b;
    h ^= h >>> 16;
    return (h >>> 0) / 0xffffffff;
  };
}

export default function DummyReviewsSection({ product }: { product: Product }) {
  const reviews = useMemo(() => {
    const rng = seededRandom(product._id);
    const count = Math.min(product.reviewCount, 6);
    const daysAgo = [3, 7, 14, 21, 35, 48];
    return Array.from({ length: count }, (_, i) => {
      const r =
        REVIEWERS[
          (Math.floor(rng() * REVIEWERS.length) + i) % REVIEWERS.length
        ];
      const rating = Math.max(
        3,
        Math.min(5, Math.round(product.rating + (rng() - 0.5) * 2)),
      );
      const d = new Date();
      d.setDate(d.getDate() - daysAgo[i % daysAgo.length]);
      return {
        id: i,
        ...r,
        rating,
        date: d.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        comment:
          COMMENTS[(Math.floor(rng() * COMMENTS.length) + i) % COMMENTS.length],
        helpful: Math.floor(rng() * 20) + 1,
      };
    });
  }, [product]);

  // Rating breakdown
  const breakdown = useMemo(() => {
    const counts = [0, 0, 0, 0, 0];
    reviews.forEach((r) => counts[r.rating - 1]++);
    return counts.reverse(); // 5→1
  }, [reviews]);

  const maxCount = Math.max(...breakdown, 1);

  return (
    <section className="mt-10">
      <h2 className="text-app-green mb-6 text-2xl font-semibold">
        Customer Reviews
      </h2>

      <div className="rounded-2xl bg-white/50 p-6 md:p-8">
        {/* Summary row */}
        <div className="border-app-border mb-8 flex flex-col gap-8 border-b pb-8 md:flex-row">
          {/* Average */}
          <div className="flex-center flex-col md:min-w-[160px] lg:w-1/3">
            <span className="text-app-green text-5xl font-semibold">
              {product.rating}
            </span>
            <div className="mt-2 mb-1 flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <StarIcon
                  key={s}
                  className={`size-4 ${s <= Math.round(product.rating) ? "text-app-warning fill-app-warning" : "text-app-border"}`}
                />
              ))}
            </div>
            <span className="text-sm text-zinc-600">
              {product.reviewCount} reviews
            </span>
          </div>

          {/* Breakdown bars */}
          <div className="flex-1 space-y-2">
            {breakdown.map((count, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-8 text-right text-sm text-zinc-600">
                  {5 - i} ★
                </span>
                <div className="bg-app-border h-2.5 flex-1 overflow-hidden rounded-full">
                  <div
                    className="bg-app-warning h-full rounded-full transition-all duration-500"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="w-6 text-xs text-zinc-600">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Individual reviews */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="flex gap-4">
              <div className="bg-app-green/10 text-app-green flex-center size-10 shrink-0 rounded-full text-sm font-semibold">
                {review.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="text-app-text text-sm font-semibold">
                    {review.name}
                  </span>
                  <span className="text-xs text-zinc-600">·</span>
                  <span className="text-xs text-zinc-600">{review.date}</span>
                </div>
                <div className="mb-2 flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <StarIcon
                      key={s}
                      className={`size-3.5 ${s <= review.rating ? "text-app-warning fill-app-warning" : "text-app-border"}`}
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-zinc-600">
                  {review.comment}
                </p>
                <button className="hover:text-app-green mt-2 flex items-center gap-1.5 text-xs text-zinc-600 transition-colors">
                  <ThumbsUpIcon className="size-3.5" /> Helpful (
                  {review.helpful})
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
