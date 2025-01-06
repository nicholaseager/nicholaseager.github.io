import React from "react";
import { type TableOfContentsItem } from "./item";

interface DesktopTableOfContentsProps {
  items: TableOfContentsItem[];
  activeId: string;
  onItemClick: (id: string) => void;
}

const DesktopTableOfContents: React.FC<DesktopTableOfContentsProps> = ({
  items,
  activeId,
  onItemClick,
}) => {
  return (
    <div className="hidden md:flex justify-center px-4">
      <div className="inline-flex p-1 space-x-1 bg-slate-100 rounded-full">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
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
  );
};

export default DesktopTableOfContents;
