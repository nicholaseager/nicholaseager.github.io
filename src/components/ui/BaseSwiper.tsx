import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
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
  return (
    <div className="overflow-hidden">
      <div className="p-4">
        <Swiper
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
    </div>
  );
};

export default BaseSwiper;
