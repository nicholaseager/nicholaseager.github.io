import React from "react";
import Button from "./ui/LinkButton";

interface ButtonOverlayProps {
  onButtonClick: () => void;
  buttonText: string;
}

export const ButtonOverlay: React.FC<ButtonOverlayProps> = ({
  onButtonClick,
  buttonText,
}) => {
  return (
    <div className="absolute inset-0 bg-background bg-opacity-60 flex items-center justify-center">
      <div className="shadow-lg">
        <Button size="lg" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
