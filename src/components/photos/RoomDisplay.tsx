import React from "react";
import Image from "../image-kit/Image";

interface RoomDisplayProps {
  artworkPath: string;
  background: string;
  aspectRatio: string;
  artworkPosition: {
    top: string;
    left: string;
    right: string;
    bottom: string;
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
          className="absolute inset-0 flex items-center justify-center"
          style={{
            ...artworkPosition,
          }}
        >
          <Image
            path={artworkPath}
            className="shadow-xl border-4 sm:border-8 border-white object-contain w-auto h-auto max-w-full max-h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default RoomDisplay;
