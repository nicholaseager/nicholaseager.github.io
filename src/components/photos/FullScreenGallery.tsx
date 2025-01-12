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
  showOrderPrintButton?: boolean;
  onClose?: () => void;
}

export default function FullScreenGallery({
  photos,
  startIndex,
  showOrderPrintButton = true,
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

      {showOrderPrintButton && (
        <LinkButton
          variant="custom"
          className="absolute top-4 left-4 z-50 bg-gray-200 hover:bg-gray-300 text-slate-900 flex items-center gap-2 cursor-pointer"
          onClick={handleOrderPrint}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
            />
          </svg>
          Order Print
        </LinkButton>
      )}

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
                sizes="100vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
