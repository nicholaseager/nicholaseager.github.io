import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  animate?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  backgroundColor = "bg-surface",
  animate = true,
}) => {
  const animateClass =
    "transform transition-transform duration-200 hover:scale-105 hover:shadow-xl";
  return (
    <div
      className={`rounded-lg shadow-lg overflow-hidden ${backgroundColor} ${
        animate ? animateClass : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
