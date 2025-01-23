import type { ButtonHTMLAttributes } from "react";

export type ButtonSize = "sm" | "md" | "lg";

interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  className?: string; // For custom variant
  children: React.ReactNode;
}

function TextButton({
  size = "md",
  children,
  className = "",
  ...props
}: TextButtonProps) {
  const sizes: Record<ButtonSize, string> = {
    sm: "text-sm",
    md: "",
    lg: "sm:text-lg",
  };

  return (
    <button
      className={`${sizes[size]} text-content-light hover:text-content-strong inline-flex items-center rounded-md transition-colors not-prose`}
      {...props}
    >
      {children}
    </button>
  );
}

export default TextButton;
