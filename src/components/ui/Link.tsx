import type { AnchorHTMLAttributes } from "react";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string; // For custom variant
  children: React.ReactNode;
}

function Link({ children, className = "", ...props }: LinkProps) {
  return (
    <a
      className={`font-[500] tracking-[0] leading-[1.6] underline not-prose ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

export default Link;
