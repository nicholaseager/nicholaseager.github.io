import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`max-w-sm rounded-lg shadow-lg overflow-hidden bg-white transform transition-transform duration-200 hover:scale-105 hover:shadow-xl ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
