import React from "react";

interface SegmentedControlProps {
  items: { id: string; title: string }[];
  activeId: string;
  onItemClick: (id: string) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  items,
  activeId,
  onItemClick,
}) => {
  return (
    <div className="inline-flex p-1 space-x-1 bg-slate-100 rounded-full">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onItemClick(item.id)}
          className={`
            px-4 py-2 text-sm font-medium text-slate-700 rounded-full transition-all whitespace-nowrap
            ${activeId === item.id ? "bg-white shadow-sm" : "hover:bg-white/50"}
          `}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};

export default SegmentedControl;
