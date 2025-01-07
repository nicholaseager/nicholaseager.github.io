import React from "react";
import Card from "./Card.tsx";
import Image from "../image-kit/Image.jsx";

interface BaseCardProps {
  imagePath: string;
  title: string;
  description: string;
  href?: string;
}

const BaseCard: React.FC<BaseCardProps> = ({
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
          <h2 className="text-slate-700 text-lg font-semibold">{title}</h2>
          <p className="text-slate-600 mt-2 text-sm">{description}</p>
        </div>
      </a>
    </Card>
  );
};

export default BaseCard;
