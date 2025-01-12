import React from "react";

interface SwiperNavButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
}

const SwiperNavButton: React.FC<SwiperNavButtonProps> = ({
  direction,
  onClick,
  disabled = false,
}) => {
  const isNext = direction === "next";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute ${
        isNext ? "-right-2 lg:-right-12" : "-left-2 lg:-left-12"
      } top-1/2 z-10 -translate-y-1/2 bg-white p-2 rounded-full shadow-md transition-colors ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
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
