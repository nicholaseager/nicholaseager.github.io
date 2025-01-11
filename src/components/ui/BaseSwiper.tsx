import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";

interface BaseSwiperProps {
  children: React.ReactNode[];
  breakpoints?: {
    xs?: number; // 320px
    sm?: number; // 640px
    md?: number; // 768px
    lg?: number; // 1024px
    xl?: number; // 1280px
    "2xl"?: number; // 1536px
  };
}

const BaseSwiper: React.FC<BaseSwiperProps> = ({
  children,
  breakpoints = {
    xs: 1,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 3,
    "2xl": 3,
  },
}) => {
  const swiperRef = useRef<SwiperType | undefined>(undefined);

  const slidePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const slideNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div className="relative group">
      <button
        onClick={slidePrev}
        className="absolute -left-2 lg:-left-12 top-1/2 z-10 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="p-4 overflow-hidden">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            0: { slidesPerView: breakpoints.xs || "auto" },
            640: { slidesPerView: breakpoints.sm || "auto" },
            768: { slidesPerView: breakpoints.md || "auto" },
            1024: { slidesPerView: breakpoints.lg || "auto" },
            1280: { slidesPerView: breakpoints.xl || "auto" },
            1536: { slidesPerView: breakpoints["2xl"] || "auto" },
          }}
          spaceBetween={30}
          grabCursor={true}
          style={{ overflow: "visible" }}
        >
          {React.Children.map(children, (child, index) => (
            <SwiperSlide key={index}>{child}</SwiperSlide>
          ))}
        </Swiper>
      </div>

      <button
        onClick={slideNext}
        className="absolute -right-2 lg:-right-12 top-1/2 z-10 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default BaseSwiper;
