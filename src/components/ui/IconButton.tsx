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
    primary: "bg-accent hover:brightness-90 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-slate-900",
    custom: className,
  };

  const sizes: Record<IconButtonSize, string> = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  return (
    <a
      className={`${variants[variant]} ${sizes[size]} inline-flex items-center justify-center rounded-full transition-colors`}
      {...props}
    >
      {children}
    </a>
  );
}

export default IconButton;
