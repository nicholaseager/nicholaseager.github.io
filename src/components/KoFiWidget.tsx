import { useState } from "react";
import { KoFiButton } from "./KoFiButton";

export const KoFiWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-[10000]">
      <div className="relative">
        <KoFiButton
          text="Support Me"
          className="shadow-lg !rounded-full select-none"
          size="lg"
          animated={false}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="ko-fi-iframe"
        />

        <div
          id="ko-fi-iframe"
          className={`absolute bottom-16 left-0 w-[350px] max-w-[calc(100vw-32px)] h-[650px] max-h-[calc(100vh-100px)] bg-white rounded-lg shadow-2xl transition-all duration-300 origin-bottom-left ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95 pointer-events-none"
          }`}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
            aria-label="Close Ko-fi widget"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {isOpen && (
            <iframe
              title="Ko-fi donations"
              src="https://ko-fi.com/nicholaseager/?widget=true&embed=true"
              className="w-full h-full rounded-lg"
              allow="payment"
            />
          )}
        </div>
      </div>
    </div>
  );
};
