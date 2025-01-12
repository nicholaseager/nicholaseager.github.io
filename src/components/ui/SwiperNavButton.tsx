import React from "react";

interface SwiperNavButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "fullscreen";
}

const SwiperNavButton: React.FC<SwiperNavButtonProps> = ({
  direction,
  onClick,
  disabled = false,
  variant = "default",
}) => {
  const isNext = direction === "next";

  const positionClasses = {
    default: isNext ? "-right-2 lg:-right-12" : "-left-2 lg:-left-12",
    fullscreen: isNext ? "right-4 lg:right-8" : "left-4 lg:left-8",
  };

  const styleClasses = {
    default: "bg-white shadow-md",
    fullscreen: "bg-white/10 hover:bg-white/20 backdrop-blur-sm",
  };

  const iconColorClass = variant === "fullscreen" ? "text-white" : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute ${
        positionClasses[variant]
      } top-1/2 z-50 -translate-y-1/2 p-2 rounded-full transition-colors ${
        styleClasses[variant]
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 ${iconColorClass}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={isNext ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
        />
      </svg>
    </button>
  );
};

export default SwiperNavButton;
