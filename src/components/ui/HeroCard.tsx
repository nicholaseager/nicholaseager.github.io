import React from "react";
import Card from "./Card.tsx";
import Image from "../image-kit/Image.js";
import Text from "./Text.tsx";

interface HeroCardProps {
  imagePath: string;
  title: string;
  subtitle: string;
  href?: string;
}

const HeroCard: React.FC<HeroCardProps> = ({
  imagePath,
  title,
  subtitle,
  href,
}) => {
  return (
    <Card className="w-full h-64">
      <a href={href} className="relative block w-full h-full">
        <Image
          path={imagePath}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
          <Text
            variant="h2"
            className="font-bold uppercase text-white shadow-md"
          >
            {title}
          </Text>
          <Text variant="caption" className="uppercase text-white shadow-md">
            {subtitle}
          </Text>
        </div>
      </a>
    </Card>
  );
};

export default HeroCard;