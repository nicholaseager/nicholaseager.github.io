import React, { useRef } from "react";
import "swiper/css";
import BaseSwiper from "./BaseSwiper";
import HeroCard from "./HeroCard";

interface HeroItem {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
}

interface HeroSwiperProps {
  items: HeroItem[];
  urlPrefix: string;
}

const HeroSwiper: React.FC<HeroSwiperProps> = ({ items, urlPrefix }) => {
  return (
    <BaseSwiper>
      {items.map((item, index) => (
        <HeroCard
          href={`${urlPrefix}/${item.slug}/`}
          imagePath={item.image}
          title={item.title}
          subtitle={item.subtitle}
        />
      ))}
    </BaseSwiper>
  );
};

export default HeroSwiper;
