import LinkButton, { type ButtonSize } from "./ui/LinkButton";
import { type AnchorHTMLAttributes } from "react";

interface KoFiButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  text?: string;
  animated?: Boolean;
  onClick?: () => void;
  className?: string;
  size?: ButtonSize;
}

export const KoFiButton = ({
  text = "Buy Me a Coffee",
  animated = true,
  onClick,
  className,
  size,
  ...props
}: KoFiButtonProps) => {
  const animateClassName =
    "animate-[kofi-shake_2s_ease-in-out_infinite] motion-safe:transition-transform";
  return (
    <LinkButton
      variant="custom"
      className={`${className} bg-social-kofi hover:bg-social-kofi-hover text-social-kofi-content`}
      size={size}
      onClick={onClick}
      {...props}
    >
      <div className="flex flex-row gap-2">
        <img
          className={`w-8 object-contain flex-shrink-0 ${
            animated ? animateClassName : ""
          }`}
          src="/kofi-cup-border.webp"
          alt="Ko-Fi donation"
        />
        {text}
      </div>
    </LinkButton>
  );
};
