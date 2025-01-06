import React from "react";
import { type TableOfContentsItem } from "./item";
import SegmentedControl from "../ui/SegmentedControl";

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
      <SegmentedControl
        items={items}
        activeId={activeId}
        onItemClick={onItemClick}
      />
    </div>
  );
};

export default DesktopTableOfContents;
