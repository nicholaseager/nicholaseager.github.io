import React from "react";
import Card from "../ui/Card";
import Image from "../image-kit/Image";

interface PhotoGridProps {
  photos: string[];
  onPhotoClick?: (index: number) => void;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, onPhotoClick }) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {photos.map((photo, index) => (
        <Card key={photo}>
          <div
            className="break-inside-avoid cursor-pointer"
            onClick={() => onPhotoClick?.(index)}
          >
            <Image path={photo} className="w-full h-auto object-cover" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PhotoGrid;
