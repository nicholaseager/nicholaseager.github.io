import { type ReactNode, type FormEvent } from "react";

interface NetlifyFormProps {
  name: string;
  children: ReactNode;
  className?: string;
  onSuccess?: () => void;
}

const NetlifyForm: React.FC<NetlifyFormProps> = ({
  name,
  children,
  className,
  onSuccess,
}: NetlifyFormProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    // Convert FormData to a plain object first
    const formObject: Record<string, string> = {};
    formData.forEach((value, key) => {
      formObject[key] = value.toString();
    });

    // Submit to Netlify forms endpoint
    // Note: CORS error is expected but can be ignored as submission still works
    fetch("https://extraordinary-sherbet-37382c.netlify.app", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formObject).toString(),
    }).finally(() => {
      form.reset();
      onSuccess?.();
    });
  };

  const styles = {
    yourWebsiteHere: {
      display: "none",
    },
  };

  {
    /***
    -- Netlify Form Configuration
      - data-netlify="true" enables Netlify form handling
      - netlify-honeypot adds spam protection
      - data-form-name is used for JS form handling
    ***/
  }
  return (
    <form
      className={className}
      method="POST"
      name={name}
      id={name}
      onSubmit={handleSubmit}
      data-netlify="true"
      netlify-honeypot="url-field"
    >
      {/* Required hidden field for Netlify forms */}
      <input type="hidden" name="form-name" value={name} />

      {/* Hidden field to track form submission source URL */}
      <input
        type="hidden"
        name="url"
        value={typeof window !== "undefined" ? window.location.href : ""}
      />

      {/* Honeypot field to catch spam bots */}
      <p style={styles.yourWebsiteHere}>
        <label htmlFor="url-field">URL</label>
        <input type="url" name="url-field" id="url-field" />
      </p>

      {/* Custom form fields */}
      {children}
    </form>
  );
};

export default NetlifyForm;
