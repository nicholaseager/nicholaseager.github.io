import React from "react";
import CollapsibleTable from "../ui/CollapsibleTable";

interface ItineraryPhase {
  title: string;
  description?: string;
  images?: string[];
  elevation?: number;
  distance?: number;
}

interface Props {
  itinerary: ItineraryPhase[];
}

const ItineraryTable: React.FC<Props> = ({ itinerary }) => {
  const columns = [
    { id: "day", label: "Day", width: "20%" },
    { id: "itinerary", label: "Itinerary", width: "55%" },
    { id: "details", label: "Details", width: "25%" },
  ];

  const rows = itinerary.map((phase, index) => ({
    cells: {
      day: (
        <>
          <span className="hidden sm:block">Day {index + 1}</span>
          <span className="block sm:hidden">{index + 1}</span>
        </>
      ),
      itinerary: <span className="block wrap">{phase.title}</span>,
      details: (
        <div className="flex flex-col sm:flex-row sm:gap-2 text-sm">
          {phase.distance && <span>{phase.distance}km</span>}
          {phase.elevation && <span>{phase.elevation}m</span>}
        </div>
      ),
    },
    expandedContent: {
      description: phase.description,
      images: phase.images,
    },
  }));

  return <CollapsibleTable columns={columns} rows={rows} />;
};

export default ItineraryTable;
