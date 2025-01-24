import React from "react";

type Size = "sm" | "md" | "lg";

interface TextInputProps {
  type?: string;
  name: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
  size?: Size;
}

const labelSizes: Record<Size, string> = {
  sm: "text-sm",
  md: "text-sm md:text-base",
  lg: "text-sm md:text-base lg:text-lg",
};

const inputSizes: Record<Size, string> = {
  sm: "px-2 py-1.5 text-sm",
  md: "px-3 py-2.5 md:px-4 md:py-3.5 text-sm md:text-base",
  lg: "px-3 py-2.5 md:px-4 md:py-3.5 text-sm md:text-base lg:text-lg",
};

const TextInput: React.FC<TextInputProps> = ({
  type = "text",
  name,
  label,
  placeholder,
  multiline = false,
  size = "md",
}) => {
  return (
    <div>
      <label
        className={`block font-[700] text-content-strong ${labelSizes[size]}`}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          name={name}
          placeholder={placeholder}
          className={`w-full mt-2 border-2 border-gray-200 rounded bg-surface text-content-light transition-colors duration-150 ease-in-out focus:outline-none focus:border-primary min-h-[200px] resize-none ${inputSizes[size]}`}
          required
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={`w-full mt-2 border-2 border-gray-200 rounded bg-surface text-content-light transition-colors duration-150 ease-in-out focus:outline-none focus:border-primary ${inputSizes[size]}`}
          required
        />
      )}
    </div>
  );
};

export default TextInput;
