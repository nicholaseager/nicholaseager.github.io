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
        <Image
          path={`prints/backgrounds/${background}`}
          className="absolute inset-0 object-cover w-full h-full"
          sizes="50vw"
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
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
};

export default RoomDisplay;
