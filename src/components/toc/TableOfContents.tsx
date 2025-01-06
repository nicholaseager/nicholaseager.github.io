import React, { useState } from "react";
import MobileTableOfContents from "./MobileTableOfContents";
import DesktopTableOfContents from "./DesktopTableOfContents";
import { type TableOfContentsItem } from "./item";

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState(items[0]?.id);

  const handleItemClick = (id: string) => {
    setActiveId(id);

    // Get element and header height
    const element = document.getElementById(id);
    const headerOffset = 80;

    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="sticky top-0 z-50 py-4 bg-white/80 backdrop-blur-sm">
      <MobileTableOfContents
        items={items}
        activeId={activeId}
        onItemClick={handleItemClick}
      />
      <DesktopTableOfContents
        items={items}
        activeId={activeId}
        onItemClick={handleItemClick}
      />
    </div>
  );
};

export default TableOfContents;
