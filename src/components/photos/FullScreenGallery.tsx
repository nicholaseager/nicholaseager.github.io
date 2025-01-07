import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "../image-kit/Image";
import LinkButton from "../ui/LinkButton";

import "swiper/css";
import "swiper/css/navigation";

interface FullScreenGalleryProps {
  photos: string[];
  startIndex: number;
  onClose?: () => void;
}

export default function FullScreenGallery({
  photos,
  startIndex,
  onClose,
}: FullScreenGalleryProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    // prevent scrolling when the gallery is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  useEffect(() => {
    if (swiper) {
      swiper.slideTo(startIndex, 0);
    }
  }, [swiper, startIndex]);

  const handleOrderPrint = () => {
    const currentPhotoUrl = photos[currentIndex];
    // Remove any leading slashes and create a clean path
    const cleanPath = currentPhotoUrl.replace(/^\/+/, "");
    const absoluteUrl = new URL(cleanPath, window.location.origin).toString();
    window.location.href = absoluteUrl;
  };

  return (
    <div className="fixed inset-0 w-screen h-screen z-[1000]">
      <div className="absolute inset-0 bg-black" />

      <LinkButton
        variant="custom"
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-gray-200 hover:bg-gray-300 text-slate-900"
        onClick={handleOrderPrint}
      >
        Order Print
      </LinkButton>

      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      <Swiper
        modules={[Navigation, Keyboard]}
        navigation
        keyboard
        onSwiper={setSwiper}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        slidesPerView={1}
        speed={300}
        loop={false}
        className="h-full w-full"
      >
        {photos.map((photo, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center h-full w-full p-4"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                path={photo}
                className="max-h-[100vh] max-w-[100vw] w-auto h-auto object-fill"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
