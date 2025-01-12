import type { HTMLAttributes, ElementType } from "react";

// Define all possible text variants that this component can render
export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "blockquote"
  | "caption"
  | "custom";

// Extend HTML attributes to create our component props
// Using HTMLElement instead of specific element type (like HTMLParagraphElement)
// because this component can render different HTML elements (h1-h6, p, blockquote)
interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  spacing?: "none" | "normal" | "loose" | "tight";
  className?: string;
  children: React.ReactNode;
}

function Text({
  variant = "body", // Default to body style if no variant provided
  children,
  className = "",
  spacing = "none",
  ...props // Spread operator to allow passing any additional HTML attributes
}: TextProps) {
  // Map each variant to its corresponding Tailwind classes
  // Using arbitrary values ([size]) to match exact pixel specifications
  // Responsive prefixes (md:, lg:) provide different styles at different breakpoints
  const variants: Record<TextVariant, string> = {
    h1: "text-slate-700 text-[25px] md:text-[35px] lg:text-[45px] font-[500] tracking-[-0.02em] leading-[1.2]",
    h2: "text-slate-700 text-[24px] md:text-[30px] lg:text-[35px] font-[500] tracking-[-0.02em] leading-[1.2]",
    h3: "text-slate-700 text-[20px] md:text-[25px] lg:text-[30px] font-[500] tracking-[-0.02em] leading-[1.3]",
    h4: "text-slate-700 text-[17px] md:text-[22px] lg:text-[22px] font-[500] tracking-[0] leading-[1.6]",
    h5: "text-slate-700 text-[16px] md:text-[19px] lg:text-[20px] font-[500] tracking-[0] leading-[1.6]",
    h6: "text-slate-700 text-[15px] md:text-[17px] lg:text-[18px] font-[500] tracking-[0] leading-[1.6]",
    body: "text-slate-600 text-[15px] md:text-[17px] lg:text-[19px] font-[300] tracking-[0] leading-[1.6]",
    blockquote:
      "text-slate-600 text-[25px] md:text-[35px] lg:text-[45px] font-[300] tracking-[-0.02em] leading-[1.6]",
    caption:
      "text-slate-600 text-[13px] md:text-[15px] lg:text-[17px] font-[300] tracking-[0] leading-[1.6] italic",

    custom: "", // Only uses custom class
  };

  // Add spacing variants
  const spacingVariants: Record<NonNullable<TextProps["spacing"]>, string> = {
    none: "",
    normal: "mb-4 last:mb-0",
    loose: "mb-6 last:mb-0",
    tight: "mb-2 last:mb-0",
  };

  // Dynamically determine which HTML element to render based on the variant
  // ElementType is used to type the dynamic component for proper TypeScript support
  const Component: ElementType = variant.startsWith("h")
    ? (variant as ElementType)
    : variant === "blockquote"
    ? "blockquote"
    : "p";

  return (
    <Component
      className={`${variants[variant]} ${spacingVariants[spacing]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Text;
