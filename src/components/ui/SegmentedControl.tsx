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
    <div className="inline-flex p-1 space-x-1 bg-component rounded-full">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onItemClick(item.id)}
          className={`
            px-4 py-2 text-sm font-medium text-content-strong rounded-full transition-all whitespace-nowrap
            ${
              activeId === item.id
                ? "bg-component-active shadow-sm"
                : "hover:bg-component-hover"
            }
          `}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};

export default SegmentedControl;
