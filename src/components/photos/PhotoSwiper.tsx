import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "../image-kit/Image";
import FullScreenGallery from "./FullScreenGallery";

import "swiper/css";
import "swiper/css/navigation";
import Card from "../ui/Card";
import BaseSwiper from "../ui/BaseSwiper";

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
      <BaseSwiper breakpoints={{ xs: 1 }}>
        {photos.map((photo, index) => (
          <Card animate={false}>
            <div onClick={() => handlePhotoClick(index)}>
              <Image className="w-full h-full" path={photo}></Image>
            </div>
          </Card>
        ))}
      </BaseSwiper>

      {selectedPhotoIndex !== null && (
        <FullScreenGallery
          photos={photos}
          startIndex={selectedPhotoIndex}
          onClose={handleCloseGallery}
          showOrderPrintButton={false}
        />
      )}
    </>
  );
}
