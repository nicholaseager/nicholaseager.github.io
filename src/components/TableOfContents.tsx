import React, { useState, useEffect, useRef } from "react";

interface TableOfContentsItem {
  title: string;
  id: string;
}

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (id: string) => {
    setActiveId(id);
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sticky top-0 z-50 py-4 bg-white/80 backdrop-blur-sm">
      {/* Mobile Dropdown */}
      <div className="md:hidden px-4" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50"
        >
          <span>
            {items.find((item) => item.id === activeId)?.title || "Contents"}
          </span>
          <svg
            className={`w-5 h-5 ml-2 transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute left-4 right-4 mt-2 py-1 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`
                  block w-full text-left px-4 py-2 text-sm
                  ${
                    activeId === item.id
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-700 hover:bg-slate-50"
                  }
                `}
              >
                {item.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Segments */}
      <div className="hidden md:flex justify-center px-4">
        <div className="inline-flex p-1 space-x-1 bg-slate-100 rounded-full">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`
                px-4 py-2 text-sm font-medium text-slate-700 rounded-full transition-all whitespace-nowrap
                ${
                  activeId === item.id
                    ? "bg-white shadow-sm"
                    : "hover:bg-white/50"
                }
              `}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;
