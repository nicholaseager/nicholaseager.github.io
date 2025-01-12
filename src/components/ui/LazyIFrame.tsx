import { useEffect, useState, type IframeHTMLAttributes } from "react";

interface LazyIframeProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  className?: string;
  backgroundColor?: string;
}

export default function LazyIframe({
  className = "",
  backgroundColor = "bg-background-alt",
  ...iframeProps
}: LazyIframeProps) {
  const [showIframe, setShowIframe] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIframe(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {(!showIframe || !iframeLoaded) && (
        <div
          className={`absolute inset-0 ${backgroundColor} animate-pulse flex items-center justify-center rounded-lg shadow-lg`}
        >
          <span className="text-slate-900">Loading...</span>
        </div>
      )}
      {showIframe && (
        <iframe
          {...iframeProps}
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          loading="lazy"
          onLoad={() => setIframeLoaded(true)}
        />
      )}
    </>
  );
}
