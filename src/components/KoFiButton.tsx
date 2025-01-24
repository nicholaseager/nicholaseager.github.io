import LinkButton from "./ui/LinkButton";
import { type AnchorHTMLAttributes } from "react";

interface KoFiButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  onClick?: () => void;
}

export const KoFiButton = ({ onClick, ...props }: KoFiButtonProps) => {
  return (
    <LinkButton
      variant="custom"
      className="bg-social-kofi hover:bg-social-kofi-hover text-social-kofi-content"
      onClick={onClick}
      {...props}
    >
      <div className="flex flex-row gap-2">
        <img
          className="w-8 object-contain flex-shrink-0 animate-[kofi-shake_2s_ease-in-out_infinite] motion-safe:transition-transform"
          src="/kofi-cup-border.webp"
          alt="Ko-Fi donation"
        />
        Buy Me a Coffee
      </div>
    </LinkButton>
  );
};
