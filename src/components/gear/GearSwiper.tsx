import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import GearCard from "./GearCard.tsx";
import gear from "../../data/gear.json";

interface ImagesSwiperProps {
  trip: string;
}

const GearSwiper: React.FC<ImagesSwiperProps> = ({ trip }) => {
  const items = gear.filter((item) => item.trips.includes(trip));

  return (
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: 2,
        },
        // sm
        640: {
          slidesPerView: 3,
        },
        // md
        768: {
          slidesPerView: 4,
        },
        // lg
        1024: {
          slidesPerView: 5,
        },
      }}
      spaceBetween={20}
      grabCursor={true}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          <GearCard
            title={item.title}
            description={item.description}
            img={item.img}
            url={item.url}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default GearSwiper;
