import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "../image-kit/Image";
import FullScreenGallery from "./FullScreenGallery";

import "swiper/css";
import "swiper/css/navigation";
import Card from "../ui/Card";

interface PhotoSwiperProps {
  photos: string[];
  className?: string;
}

export default function PhotoSwiper({
  photos,
  className = "",
}: PhotoSwiperProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );

  const handlePhotoClick = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const handleCloseGallery = () => {
    setSelectedPhotoIndex(null);
  };

  return (
    <>
      <div className={className}>
        <Swiper
          modules={[Navigation]}
          navigation
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: "auto",
            },
          }}
          spaceBetween={30}
          speed={300}
          loop={false}
          className="h-[300px] w-full"
        >
          {photos.map((photo, index) => (
            <SwiperSlide
              key={index}
              onClick={() => handlePhotoClick(index)}
              className="sm:!w-auto flex justify-center"
            >
              <Card className="w-fit sm:max-w-none mx-auto sm:mx-0">
                <Image
                  path={photo}
                  className="max-h-[calc(300px-2rem)] w-auto object-contain"
                />
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {selectedPhotoIndex !== null && (
        <FullScreenGallery
          photos={photos}
          startIndex={selectedPhotoIndex}
          onClose={handleCloseGallery}
        />
      )}
    </>
  );
}
