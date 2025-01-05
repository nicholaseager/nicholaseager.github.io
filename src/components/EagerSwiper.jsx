import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import Image from "./image-kit/Image.tsx";

const EagerSwiper = ({ imagePaths }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      grabCursor={true}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {imagePaths.map((path, index) => (
        <SwiperSlide key={index} className="rounded-lg shadow-lg">
          <Image path={path} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default EagerSwiper;
