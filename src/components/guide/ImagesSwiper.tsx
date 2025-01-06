import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import Image from "../image-kit/Image";
import Card from "../ui/Card";

interface ImagesSwiperProps {
  imagePaths: string[];
}

const ImagesSwiper: React.FC<ImagesSwiperProps> = ({ imagePaths }) => {
  const getBreakpoints = () => {
    const totalSlides = imagePaths.length;

    if (totalSlides < 3) {
      return {
        320: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: Math.min(totalSlides, 2),
        },
        1024: {
          slidesPerView: totalSlides,
        },
      };
    }

    return {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    };
  };

  return (
    <Swiper breakpoints={getBreakpoints()} spaceBetween={20} grabCursor={true}>
      {imagePaths.map((path, index) => (
        <SwiperSlide key={index}>
          <div className="rounded-lg shadow-lg overflow-hidden">
            <Image path={path} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImagesSwiper;
