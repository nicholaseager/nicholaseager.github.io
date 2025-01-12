import React, { useState, useRef, useEffect } from "react";

interface DropdownItem {
  id: string;
  label: string;
  href?: string;
}

interface DropdownProps {
  items: DropdownItem[];
  activeItemId: string;
  currentLabel: string;
  onItemClick?: (id: string) => void;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  activeItemId,
  currentLabel,
  onItemClick,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleItemSelection = (id: string, href?: string) => {
    if (onItemClick) {
      onItemClick(id);
    }
    if (href) {
      window.location.href = href;
    }
    setIsOpen(false);
  };

  return (
    <div className={className} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-secondary hover:bg-secondary-hover text-md font-medium text-secondary-content w-full flex items-center justify-between px-4 py-2 border border-border rounded-full"
      >
        <span>{currentLabel}</span>
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
        <div className="absolute left-4 right-4 mt-2 p-1 bg-component rounded-lg shadow-lg">
          <div className="flex flex-col space-y-1">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemSelection(item.id, item.href)}
                className={`
                  block w-full text-left px-4 py-2 text-lg text-content-strong rounded-lg transition-all whitespace-nowrap
                  ${
                    activeItemId === item.id
                      ? "bg-component-active shadow-sm"
                      : "hover:bg-component-hover"
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
