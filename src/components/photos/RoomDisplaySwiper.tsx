import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "../image-kit/Image";
import RoomDisplay from "./RoomDisplay";

interface PrintDisplayProps {
  artworkPath: string;
}

const roomDisplays = [
  {
    id: 1,
    background: "solid-white",
    aspectRatio: "1",
    artworkPosition: {
      width: "80%",
      top: "10%",
      left: "10%",
    },
  },
  {
    id: 2,
    background: "solid-concrete",
    aspectRatio: "1",
    artworkPosition: {
      width: "80%",
      top: "10%",
      left: "10%",
    },
  },
  {
    id: 3,
    background: "blue-wall-wooden-chairs",
    aspectRatio: "1",
    artworkPosition: {
      width: "60%",
      top: "5%",
      left: "20%",
    },
  },
  {
    id: 4,
    background: "white-wall-wooden-floor-dog",
    aspectRatio: "0.72733333",
    artworkPosition: {
      width: "50%",
      top: "10%",
      left: "10%",
    },
  },
  {
    id: 5,
    background: "brick-wall-bicycle",
    aspectRatio: "0.886",
    artworkPosition: {
      width: "60%",
      top: "5%",
      left: "20%",
    },
  },
  {
    id: 6,
    background: "brown-wall-wooden-furntiure",
    aspectRatio: "1.00874243",
    artworkPosition: {
      width: "40%",
      top: "20%",
      right: "20%",
    },
  },
  {
    id: 7,
    background: "white-wall-tropical-plants-natural-light",
    aspectRatio: "1",
    artworkPosition: {
      width: "40%",
      top: "20%",
      right: "10%",
    },
  },
  {
    id: 8,
    background: "white-wall-wooden-cabinet",
    aspectRatio: "1",
    artworkPosition: {
      width: "40%",
      top: "10%",
      right: "23%",
    },
  },
  {
    id: 9,
    background: "white-wall-gray-couch-dog",
    aspectRatio: "1.5",
    artworkPosition: {
      width: "30%",
      top: "10%",
      right: "25%",
    },
  },
  {
    id: 10,
    background: "dark-grey-wall-wooden-dresser",
    aspectRatio: "1.08303249",
    artworkPosition: {
      width: "50%",
      top: "10%",
      right: "15%",
    },
  },
];

const PrintDisplay: React.FC<PrintDisplayProps> = ({ artworkPath }) => {
  return (
    <Swiper className="w-full">
      {roomDisplays.map((room) => (
        <SwiperSlide key={room.id}>
          <RoomDisplay
            artworkPath={artworkPath}
            background={room.background}
            aspectRatio={room.aspectRatio}
            artworkPosition={room.artworkPosition}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PrintDisplay;
