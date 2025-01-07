import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import TestimonialCard from "./TestimonialCard.tsx";
import testimonials from "../../data/testimonials.json";

const TestimonialSwiper: React.FC = () => {
  return (
    <Swiper slidesPerView={1} spaceBetween={40} grabCursor={true}>
      {testimonials.map((item, index) => (
        <SwiperSlide key={index}>
          <TestimonialCard
            quote={item.quote}
            author={item.author}
            url={item.url}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialSwiper;
