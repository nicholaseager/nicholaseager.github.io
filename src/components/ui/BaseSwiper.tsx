import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import BaseCard from "./BaseCard";

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
    <Swiper
      breakpoints={{
        320: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      spaceBetween={20}
      grabCursor={true}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          <BaseCard
            href={`${urlPrefix}/${item.id}/`}
            imagePath={item.image}
            title={item.title}
            description={item.description}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BaseSwiper;
