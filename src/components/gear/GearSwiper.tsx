import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import GearCard from "./GearCard.tsx";
import gear from "../../data/gear.json";
import BaseSwiper from "../ui/BaseSwiper.tsx";

interface ImagesSwiperProps {
  trip: string;
}

const GearSwiper: React.FC<ImagesSwiperProps> = ({ trip }) => {
  const items = gear.filter((item) => item.trips.includes(trip));

  return (
    <BaseSwiper
      breakpoints={{
        xs: 2,
        sm: 3,
        md: 4,
        lg: 5,
        xl: 5,
        "2xl": 6,
      }}
    >
      {items.map((item) => (
        <GearCard
          title={item.title}
          description={item.description}
          img={item.img}
          url={item.url}
        />
      ))}
    </BaseSwiper>
  );
};

export default GearSwiper;
