import React, { useState, useEffect } from "react";
import MobileTableOfContents from "./MobileTableOfContents";
import DesktopTableOfContents from "./DesktopTableOfContents";
import { type TableOfContentsItem } from "./item";

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    // Observe all section headings
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  const handleItemClick = (id: string) => {
    setActiveId(id);

    // Get element and header height
    const element = document.getElementById(id);
    const headerOffset = 80;

    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      data-toc
      className="sticky top-0 z-[100] py-4 bg-white/80 backdrop-blur-sm"
    >
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
