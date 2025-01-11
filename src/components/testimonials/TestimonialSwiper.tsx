import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import testimonials from "../../data/testimonials.json";
import BaseSwiper from "../ui/BaseSwiper.tsx";
import TestimonialCard from "./TestimonialCard.tsx";

const TestimonialSwiper: React.FC = () => {
  return (
    <BaseSwiper
      breakpoints={{
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 2,
        "2xl": 3,
      }}
    >
      {testimonials.map((item) => (
        <TestimonialCard
          quote={item.quote}
          author={item.author}
          url={item.url}
        />
      ))}
    </BaseSwiper>
  );
};

export default TestimonialSwiper;
