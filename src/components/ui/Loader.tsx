import React from "react";
import CompassIcon from "/src/assets/icons/Compass.svg";

const Loader: React.FC = () => {
  return (
    <div className="w-[100px] h-[100px] text-[your-color] animate-spin">
      <CompassIcon />
    </div>
  );
};

export default Loader;
