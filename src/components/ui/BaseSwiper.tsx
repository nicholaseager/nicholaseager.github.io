import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import SwiperNavButton from "./SwiperNavButton";
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
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const slidePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const slideNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div className="relative group">
      <SwiperNavButton
        direction="prev"
        onClick={slidePrev}
        disabled={isBeginning}
      />

      <div className="p-4 overflow-hidden">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
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

      <SwiperNavButton direction="next" onClick={slideNext} disabled={isEnd} />
    </div>
  );
};

export default BaseSwiper;
