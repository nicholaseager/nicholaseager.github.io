import React, { useState } from "react";
import Button from "../ui/Button";
import type { ButtonSize } from "../ui/Button";
import SuccessMessage from "./SuccessMessage";
import NetlifyForm from "./NetlifyForm";

interface FormProps {
  name: string;
  submitButtonText?: string;
  successMessage?: string;
  size?: "md" | string;
  children: React.ReactNode;
}

type Size = "sm" | "md" | "lg";
const sizes: Record<Size, string> = {
  sm: "p-4",
  md: "p-5 md:p-10",
  lg: "p-5 md:p-10 lg:p-12 xl:p-14",
};

const Form: React.FC<FormProps> = ({
  name,
  submitButtonText = "Submit",
  successMessage = "Thank you! Your form has been submitted successfully.",
  size = "md",
  children,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <div
      className={`bg-surface-secondary rounded-lg shadow-lg mx-auto w-full ${
        sizes[size as Size]
      }`}
    >
      {/* Success Message */}
      <SuccessMessage
        className={isSuccess ? "block" : "hidden"}
        message={successMessage}
      />

      <NetlifyForm name={name} onSuccess={handleSuccess}>
        {/* Custom form fields injected via children */}
        {children}

        {/* Submit button */}
        <Button type="submit" variant="primary" size={size as ButtonSize}>
          {submitButtonText}
        </Button>
      </NetlifyForm>
    </div>
  );
};

export default Form;
