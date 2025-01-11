import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Image from "../image-kit/Image";

interface ImagesSwiperProps {
  imagePaths: string[];
}

const ImagesSwiper: React.FC<ImagesSwiperProps> = ({ imagePaths }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="space-y-3">
      <Swiper
        spaceBetween={10}
        thumbs={imagePaths.length > 1 ? { swiper: thumbsSwiper } : undefined}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-full"
      >
        {imagePaths.map((path, index) => (
          <SwiperSlide key={index}>
            <div className="rounded-lg shadow-lg overflow-hidden aspect-[16/9]">
              <Image
                path={path}
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 85vw, 1080px"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {imagePaths.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {imagePaths.map((path, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-lg overflow-hidden aspect-[32/9] cursor-pointer">
                <Image
                  path={path}
                  className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity [.swiper-slide-thumb-active_&]:opacity-100"
                  sizes="(max-width: 640px) 25vw, 160px"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ImagesSwiper;
