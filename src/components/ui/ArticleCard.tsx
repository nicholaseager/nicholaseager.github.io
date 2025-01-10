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
        <Image path={imagePath} className="w-full h-48 object-cover" />
        <div className="p-4">
          <Text variant="h6">{title}</Text>
          <Text variant="caption">{description}</Text>
        </div>
      </a>
    </Card>
  );
};

export default ArticleCard;
