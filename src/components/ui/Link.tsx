import type { AnchorHTMLAttributes } from "react";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string; // For custom variant
  children: React.ReactNode;
}

function Link({ children, className = "", ...props }: LinkProps) {
  return (
    <a
      className={`text-slate-600 text-[15px] md:text-[17px] lg:text-[19px] font-[600] tracking-[0] leading-[1.6] underline not-prose ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

export default Link;
