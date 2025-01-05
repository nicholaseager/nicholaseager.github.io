import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import GuideCard from "./GuideCard.tsx";

interface GuideItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface GuideSwiperProps {
  guides: GuideItem[];
}

const GuideSwiper: React.FC<GuideSwiperProps> = ({ guides }) => {
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
      {guides.map((guide, index) => (
        <SwiperSlide key={index}>
          <GuideCard
            href={`/guides/${guide.id}/`}
            imagePath={guide.image}
            title={guide.title}
            description={guide.description}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default GuideSwiper;
