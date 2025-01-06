import { useState } from "react";
import GearCard from "./GearCard.tsx";
import gear from "../../data/gear.json";
import Grid from "../ui/Grid.tsx";
import Button from "../ui/Button.tsx";

const GearGrid: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filters = ["All", "Hiking", "Filming", "Travel"];

  const filteredGear =
    activeFilter === "All"
      ? gear
      : gear.filter((item) => item.tags?.includes(activeFilter.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
        {filters.map((filter) => (
          <Button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            variant={activeFilter === filter ? "primary" : "secondary"}
            size="lg"
            className="w-[calc(50%-0.25rem)] sm:w-auto"
          >
            {filter}
          </Button>
        ))}
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
