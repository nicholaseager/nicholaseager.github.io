import React from "react";
import Card from "./Card.tsx";
import Image from "../image-kit/Image.js";
import Text from "./Text.tsx";

interface ArticleCardProps {
  imagePath: string;
  title: string;
  description: string;
  href?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  imagePath,
  title,
  description,
  href,
}) => {
  return (
    <Card>
      <a href={href || "#"}>
        <Image
          path={imagePath}
          className="w-full h-48 object-cover"
          // This assumes the card is always used in a swiper
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="p-4">
          <Text variant="h6">{title}</Text>
          <Text variant="caption">{description}</Text>
        </div>
      </a>
    </Card>
  );
};

export default ArticleCard;
