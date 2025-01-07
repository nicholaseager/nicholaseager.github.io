import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import GalleryCard from "./GalleryCard.tsx";

interface GalleryItem {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface GallerySwiperProps {
  galleries: GalleryItem[];
}

const GallerySwiper: React.FC<GallerySwiperProps> = ({ galleries }) => {
  return (
    <Swiper
      breakpoints={{
        // Mobile
        320: {
          slidesPerView: 1,
        },
        // Tablet
        768: {
          slidesPerView: 2,
        },
        // Desktop
        1024: {
          slidesPerView: 3,
        },
      }}
      spaceBetween={20}
      grabCursor={true}
    >
      {galleries.map((gallery, index) => (
        <SwiperSlide key={index}>
          <GalleryCard
            href={`/galleries/${gallery.id}/`}
            imagePath={gallery.image}
            title={gallery.name}
            description={gallery.description}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default GallerySwiper;
