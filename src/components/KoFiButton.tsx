import Button from "./ui/Button";

interface KoFiButtonProps {
  onClick: () => void;
}

export const KoFiButton = ({ onClick }: KoFiButtonProps) => {
  return (
    <Button
      variant="custom"
      className="bg-social-kofi hover:bg-social-kofi-hover text-social-kofi-content"
      onClick={onClick}
    >
      <div className="flex flex-row gap-2">
        <img
          className="w-8 object-contain flex-shrink-0 animate-[kofi-shake_2s_ease-in-out_infinite] motion-safe:transition-transform"
          src="/kofi-cup-border.webp"
          alt="Ko-Fi donation"
        />
        Support Me on Ko-Fi
      </div>
    </Button>
  );
};
