import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import ArticleCard from "./ArticleCard";

interface BaseItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface BaseSwiperProps {
  items: BaseItem[];
  urlPrefix: string;
}

const BaseSwiper: React.FC<BaseSwiperProps> = ({ items, urlPrefix }) => {
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
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          spaceBetween={30}
          grabCursor={true}
          style={{ overflow: "visible" }}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <ArticleCard
                href={`${urlPrefix}/${item.id}/`}
                imagePath={item.image}
                title={item.title}
                description={item.description}
              />
            </SwiperSlide>
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
