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
  selectedClassName?: string;
  unselectedClassName?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  activeItemId,
  currentLabel,
  onItemClick,
  className = "",
  selectedClassName = "text-blue-600 bg-blue-50",
  unselectedClassName = "text-slate-700 hover:bg-slate-50",
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
        className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50"
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
        <div className="absolute left-4 right-4 mt-2 py-1 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemSelection(item.id, item.href)}
              className={`
                block w-full text-left px-4 py-2 text-sm
                ${
                  activeItemId === item.id
                    ? selectedClassName
                    : unselectedClassName
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
