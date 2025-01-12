import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import RoomDisplay from "./RoomDisplay";
import Card from "../ui/Card";

interface PrintDisplayProps {
  artworkPath: string;
}

const roomDisplays = [
  {
    background: "solid-white",
    aspectRatio: "1",
    artworkPosition: {
      top: "10%",
      bottom: "10%",
      left: "10%",
      right: "10%",
    },
  },
  {
    background: "solid-concrete",
    aspectRatio: "1",
    artworkPosition: {
      top: "10%",
      bottom: "10%",
      left: "10%",
      right: "10%",
    },
  },
  {
    background: "blue-wall-wooden-chairs",
    aspectRatio: "1",
    artworkPosition: {
      top: "5%",
      bottom: "55%",
      left: "20%",
      right: "20%",
    },
  },
  // {
  //   background: "white-wall-wooden-floor-dog",
  //   aspectRatio: "0.72733333",
  //   artworkPosition: {
  //     top: "10%",
  //     bottom: "50%",
  //     left: "10%",
  //     right: "40%",
  //   },
  // },
  // {
  //   background: "brick-wall-bicycle",
  //   aspectRatio: "0.886",
  //   artworkPosition: {
  //     top: "5%",
  //     bottom: "55%",
  //     left: "20%",
  //     right: "20%",
  //   },
  // },
  {
    background: "brown-wall-wooden-furntiure",
    aspectRatio: "1.00874243",
    artworkPosition: {
      top: "10%",
      bottom: "50%",
      left: "40%",
      right: "20%",
    },
  },
  {
    background: "white-wall-tropical-plants-natural-light",
    aspectRatio: "1",
    artworkPosition: {
      top: "10%",
      bottom: "50%",
      left: "50%",
      right: "10%",
    },
  },
  {
    background: "white-wall-wooden-cabinet",
    aspectRatio: "1",
    artworkPosition: {
      top: "10%",
      bottom: "50%",
      left: "37%",
      right: "23%",
    },
  },
  // {
  //   background: "white-wall-gray-couch-dog",
  //   aspectRatio: "1.5",
  //   artworkPosition: {
  //     top: "10%",
  //     bottom: "60%",
  //     left: "45%",
  //     right: "25%",
  //   },
  // },
  // {
  //   background: "dark-grey-wall-wooden-dresser",
  //   aspectRatio: "1.08303249",
  //   artworkPosition: {
  //     top: "10%",
  //     bottom: "40%",
  //     left: "35%",
  //     right: "15%",
  //   },
  // },
];

const PrintDisplay: React.FC<PrintDisplayProps> = ({ artworkPath }) => {
  return (
    <Swiper
      className="w-full"
      modules={[Autoplay]}
      spaceBetween={20}
      autoplay={{
        delay: 2000,
        disableOnInteraction: true,
      }}
    >
      {roomDisplays.map((room, index) => (
        <SwiperSlide key={index}>
          <Card animate={false}>
            <RoomDisplay
              artworkPath={artworkPath}
              background={room.background}
              aspectRatio={room.aspectRatio}
              artworkPosition={room.artworkPosition}
            />
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PrintDisplay;
