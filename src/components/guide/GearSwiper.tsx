import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from "swiper/modules";

import "swiper/css";
import "swiper/css/grid";

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
          <a
            href={item.url}
            target="_blank"
            className="bg-background-alt rounded-2xl shadow-lg p-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer block h-full"
          >
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 aspect-square flex justify-center items-center">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-contain aspect-square"
                />
              </div>

              <div className="space-y-2">
                <h2 className="text-slate-700 text-lg sm:text-xl font-medium leading-tight">
                  {item.title}
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-5">
                  {item.description}
                </p>
              </div>
            </div>
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default GearSwiper;
