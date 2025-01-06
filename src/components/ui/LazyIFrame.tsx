// LazyIframe.tsx
import { useEffect, useState, type IframeHTMLAttributes } from "react";

interface LazyIframeProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  className?: string;
}

export default function LazyIframe({
  className = "",
  ...iframeProps
}: LazyIframeProps) {
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIframe(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!showIframe ? (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center rounded-lg shadow-lg">
          <span className="text-gray-500">Loading...</span>
        </div>
      ) : (
        <iframe
          {...iframeProps}
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          loading="lazy"
        />
      )}
    </>
  );
}
