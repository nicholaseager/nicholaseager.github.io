import type { AnchorHTMLAttributes } from "react";
import React from "react";

export type IconButtonVariant = "primary" | "secondary" | "custom";
export type IconButtonSize = "sm" | "md" | "lg";

interface IconButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  className?: string; // For custom variant
  children: React.ReactNode; // Content to be displayed inside the button
}

function IconButton({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: IconButtonProps) {
  const variants: Record<IconButtonVariant, string> = {
    primary: "bg-primary text-primary-content hover:bg-primary-hover",
    secondary: "bg-secondary text-secondary-content hover:bg-secondary-hover",
    custom: className,
  };

  const sizes: Record<IconButtonSize, string> = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  return (
    <a
      className={`${variants[variant]} ${sizes[size]} inline-flex items-center justify-center rounded-full transition-colors not-prose`}
      {...props}
    >
      {children}
    </a>
  );
}

export default IconButton;
