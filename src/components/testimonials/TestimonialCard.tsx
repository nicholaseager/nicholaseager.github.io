import React from "react";
import Card from "../ui/Card.tsx";
import Text from "../ui/Text.tsx";

interface CardProps {
  quote: string;
  author: string;
  url: string;
}

const TestimonialCard: React.FC<CardProps> = ({ quote, author, url }) => {
  return (
    <Card backgroundColor="background-alt">
      <a href={url} target="_blank">
        <div className="p-4 sm:p-6 space-y-4">
          <Text variant="h6">{quote}</Text>
          <Text variant="caption">{`- ${author}`}</Text>
        </div>
      </a>
    </Card>
  );
};

export default TestimonialCard;
