import React from "react";
import Card from "../ui/Card.tsx";

interface CardProps {
  title: string;
  description: string;
  url: string;
  img: string;
}

const GearCard: React.FC<CardProps> = ({ title, description, url, img }) => {
  return (
    <Card backgroundColor="background-alt">
      <div className="p-4">
        <a href={url} target="_blank">
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 aspect-square flex justify-center items-center">
              <img
                src={img}
                alt={title}
                loading="lazy"
                className="w-full h-full object-contain aspect-square"
              />
            </div>

            <div className="space-y-2">
              <h2 className="text-slate-700 text-lg sm:text-xl font-medium leading-tight">
                {title}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-5">
                {description}
              </p>
            </div>
          </div>
        </a>
      </div>
    </Card>
  );
};

export default GearCard;
