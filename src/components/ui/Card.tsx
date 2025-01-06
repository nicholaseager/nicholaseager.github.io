import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  backgroundColor?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  backgroundColor = "white",
}) => {
  return (
    <div
      className={`rounded-lg shadow-lg overflow-hidden bg-${backgroundColor} transform transition-transform duration-200 hover:scale-105 hover:shadow-xl ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
