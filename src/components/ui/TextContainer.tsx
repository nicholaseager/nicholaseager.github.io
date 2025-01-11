interface TextContainerProps {
  children: React.ReactNode;
  className?: string;
  spacing?: "normal" | "loose" | "tight";
}

function TextContainer({
  children,
  className = "",
  spacing = "normal",
}: TextContainerProps) {
  // These classes will be applied to all Text components within
  const spacingClasses = {
    normal: "[&>*]:mb-4 [&>*:last-child]:mb-0",
    loose: "[&>*]:mb-6 [&>*:last-child]:mb-0",
    tight: "[&>*]:mb-2 [&>*:last-child]:mb-0",
  };

  return (
    <div className={`${spacingClasses[spacing]} ${className}`}>{children}</div>
  );
}

export default TextContainer;
