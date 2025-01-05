import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from "swiper/modules";

import "swiper/css";
import "swiper/css/grid";

import GearCard from "./GearCard.tsx";
import gear from "../../data/gear.json";

interface ImagesSwiperProps {
  trip: string;
}

const GearSwiper: React.FC<ImagesSwiperProps> = ({ trip }) => {
  const items = gear.filter((item) => item.trips.includes(trip));

  return (
    <Swiper
      grid={{
        fill: "row",
        rows: 2,
      }}
      modules={[Grid]}
      breakpoints={{
        // Mobile
        320: {
          slidesPerView: 2,
          grid: {
            rows: 1,
          },
        },
        // Tablet
        768: {
          slidesPerView: 3,
          grid: {
            rows: 2,
          },
        },
        // Desktop
        1024: {
          slidesPerView: 5,
          grid: {
            rows: 2,
          },
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
