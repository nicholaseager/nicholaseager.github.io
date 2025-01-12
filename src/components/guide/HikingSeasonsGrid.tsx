import React from "react";
import Card from "../ui/Card";
import Text from "../ui/Text";

export interface Season {
  name: string;
  months: string;
  conditions: string;
  bestFor?: string[];
}

interface HikingSeasonsGridProps {
  seasons: Season[];
}

const HikingSeasonsGrid: React.FC<HikingSeasonsGridProps> = ({ seasons }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {seasons.map((season) => (
        <Card key={season.name} backgroundColor="background-alt">
          <div className="relative z-20 p-6 h-full flex flex-col">
            <Text variant="h4">{season.name}</Text>
            <Text variant="body" spacing="tight">
              {season.months}
            </Text>
            <Text variant="body" spacing="tight">
              {season.conditions}
            </Text>
            {season.bestFor && (
              <div className="mt-auto">
                <Text variant="h6">Best For:</Text>
                <ul className="list-disc list-inside text-slate-500">
                  {season.bestFor.map((activity) => (
                    <li key={activity}>
                      <Text variant="body" className="inline text-slate-500">
                        {activity}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default HikingSeasonsGrid;
