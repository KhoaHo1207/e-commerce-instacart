import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import type { Swiper as SwiperType } from "swiper";

type Category = {
  slug: string;
  name: string;
  image: string;
};

type CategoryCarouselProps = {
  categories: Category[];
};

export default function CategoryCarousel({
  categories,
}: CategoryCarouselProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative">
      <button
        ref={prevRef}
        className="hover:bg-app-orange/80 absolute top-1/2 left-0 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow hover:text-white"
      >
        <ChevronLeft />
      </button>

      <button
        ref={nextRef}
        className="hover:bg-app-orange/80 absolute top-1/2 right-0 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow hover:text-white"
      >
        <ChevronRight />
      </button>

      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={16}
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 6,
          },
          1280: {
            slidesPerView: 6,
          },
        }}
        onBeforeInit={(swiper: SwiperType) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        loop={true}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.slug}>
            <Link
              to={`/products?category=${category.slug}`}
              className="group flex flex-col items-center gap-3 p-4"
            >
              <div className="size-18 overflow-hidden rounded-2xl bg-orange-100 sm:size-24">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full rounded-full object-contain"
                />
              </div>

              <span className="text-center text-xs font-medium text-zinc-600">
                {category.name}
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
