import type { AnchorHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "custom";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  bgColor?: string; // For custom background
  hoverBgColor?: string; // For custom hover
  textColor?: string; // For custom text color
  children: React.ReactNode;
}

function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  bgColor,
  hoverBgColor,
  textColor,
  ...props
}: ButtonProps) {
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-accent hover:brightness-90 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
    custom: `bg-${bgColor} hover:bg-${hoverBgColor} text-${textColor}`,
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-4 py-2 text-lg",
  };

  return (
    <a
      className={`${variants[variant]} ${sizes[size]} inline-flex items-center rounded-md transition-colors ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

export default Button;
