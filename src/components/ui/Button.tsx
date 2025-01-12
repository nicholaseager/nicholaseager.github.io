import type { ButtonHTMLAttributes } from "react";
import type { ButtonVariant } from "./LinkButton";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string; // For custom variant
  children: React.ReactNode;
}

function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-primary text-primary-content hover:bg-primary-hover",
    secondary: "bg-secondary text-secondary-content hover:bg-secondary-hover",
    custom: className,
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-4 py-2 sm:text-lg",
  };

  return (
    <button
      className={`${variants[variant]} ${sizes[size]} inline-flex items-center rounded-md transition-colors not-prose`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
