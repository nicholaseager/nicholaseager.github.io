import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import Image from "../image-kit/Image";

interface ImagesSwiperProps {
  imagePaths: string[];
}

const ImagesSwiper: React.FC<ImagesSwiperProps> = ({ imagePaths }) => {
  return (
    <Swiper slidesPerView={1} spaceBetween={20} grabCursor={true}>
      {imagePaths.map((path, index) => (
        <SwiperSlide key={index} className="rounded-lg shadow-lg">
          <Image path={path} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImagesSwiper;
