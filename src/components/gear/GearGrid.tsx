import { useState } from "react";
import GearCard from "./GearCard.tsx";
import gear from "../../data/gear.json";
import Grid from "../ui/Grid.tsx";
import SegmentedControl from "../ui/SegmentedControl";

const GearGrid: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filters = [
    { id: "all", title: "All" },
    { id: "hiking", title: "Hiking" },
    { id: "filming", title: "Filming" },
    { id: "travel", title: "Travel" },
  ];

  const filteredGear =
    activeFilter === "all"
      ? gear
      : gear.filter((item) => item.tags?.includes(activeFilter));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8">
      <div className="flex justify-center mb-8">
        <SegmentedControl
          items={filters}
          activeId={activeFilter}
          onItemClick={setActiveFilter}
        />
      </div>

      <Grid>
        {filteredGear.map((item) => (
          <GearCard
            key={item.title}
            title={item.title}
            description={item.description}
            img={item.img}
            url={item.url}
          />
        ))}
      </Grid>
    </div>
  );
};

export default GearGrid;
