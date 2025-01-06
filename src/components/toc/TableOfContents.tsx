import React, { useState, useEffect } from "react";
import MobileTableOfContents from "./MobileTableOfContents";
import DesktopTableOfContents from "./DesktopTableOfContents";
import { type TableOfContentsItem } from "./item";

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    // Create a sentinel element before the TOC
    const sentinel = document.createElement("div");
    const toc = document.querySelector("[data-toc]");
    if (toc?.parentNode) {
      toc.parentNode.insertBefore(sentinel, toc);
    }

    const stickyObserver = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        threshold: 0,
      }
    );

    stickyObserver.observe(sentinel);

    return () => {
      stickyObserver.disconnect();
      sentinel.remove();
    };
  }, []);

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
      className={`sticky top-0 z-50 py-4 backdrop-blur-sm transition-colors duration-200 ${
        isSticky ? "bg-gray-900/80" : "bg-white/80"
      }`}
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
