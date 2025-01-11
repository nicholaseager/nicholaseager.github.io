import React, { useState } from "react";
import Card from "../ui/Card";
import Image from "../image-kit/Image";
import FullScreenGallery from "./FullScreenGallery";

interface PhotoGridProps {
  photos: string[];
  onPhotoClick?: (index: number) => void;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, onPhotoClick }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );

  const handlePhotoClick = (index: number) => {
    setSelectedPhotoIndex(index);
    onPhotoClick?.(index);
  };

  const handleCloseGallery = () => {
    setSelectedPhotoIndex(null);
  };

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {photos.map((photo, index) => (
          <Card key={photo}>
            <div
              className="break-inside-avoid cursor-pointer"
              onClick={() => handlePhotoClick(index)}
            >
              <Image
                path={photo}
                className="w-full h-auto object-cover"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>
          </Card>
        ))}
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
};

export default PhotoGrid;
