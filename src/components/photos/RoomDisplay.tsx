import React from "react";
import Image from "../image-kit/Image";

interface RoomDisplayProps {
  artworkPath: string;
  background: string;
  aspectRatio: string;
  artworkPosition: {
    width?: string;
    top?: string;
    left?: string;
    right?: string;
  };
}

const RoomDisplay: React.FC<RoomDisplayProps> = ({
  artworkPath,
  background,
  aspectRatio,
  artworkPosition,
}) => {
  return (
    <div className="relative w-full">
      {/* Background container with aspect ratio */}
      <div className="relative w-full" style={{ aspectRatio: aspectRatio }}>
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://ik.imagekit.io/qn1gkawvy/prints/backgrounds/${background}.jpg)`,
          }}
        />

        {/* Artwork Overlay */}
        <div
          className="absolute shadow-xl"
          style={{
            ...artworkPosition,
            position: "absolute",
          }}
        >
          <Image
            path={artworkPath}
            className="w-full h-auto border-4 sm:border-8 border-white"
          />
        </div>
      </div>
    </div>
  );
};

export default RoomDisplay;
