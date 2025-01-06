import Dropdown from "../ui/Dropdown";
import { type TableOfContentsItem } from "./item";

interface MobileTableOfContentsProps {
  items: TableOfContentsItem[];
  activeId: string;
  onItemClick: (id: string) => void;
}

const MobileTableOfContents: React.FC<MobileTableOfContentsProps> = ({
  items,
  activeId,
  onItemClick,
}) => {
  const dropdownItems = items.map((item) => ({
    id: item.id,
    label: item.title,
  }));

  const currentLabel =
    items.find((item) => item.id === activeId)?.title || "Contents";

  return (
    <Dropdown
      className="md:hidden px-4"
      items={dropdownItems}
      activeItemId={activeId}
      currentLabel={currentLabel}
      onItemClick={onItemClick}
    />
  );
};

export default MobileTableOfContents;
