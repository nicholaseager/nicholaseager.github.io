import type { AnchorHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "custom";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
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
    primary: "bg-accent hover:brightness-90 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-slate-900",
    custom: className,
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-4 py-2 text-lg",
  };

  return (
    <a
      className={`${variants[variant]} ${sizes[size]} inline-flex items-center rounded-md cursor-pointer transition-colors not-prose`}
      {...props}
    >
      {children}
    </a>
  );
}

export default Button;
