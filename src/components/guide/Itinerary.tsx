import React, { useState } from "react";
import Image from "../image-kit/Image";

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
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (index: number) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="overflow-x-auto shadow-md rounded-lg max-w-full">
      <table className="table-fixed w-full text-sm text-left">
        <thead className="text-xs text-slate-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-2 sm:px-6 py-3 w-[20%]">
              <span className="block truncate">Day</span>
            </th>
            <th scope="col" className="px-2 sm:px-6 py-3 w-[50%] sm:w-[55%]">
              <span className="block truncate">Itinerary</span>
            </th>
            <th scope="col" className="px-2 sm:px-6 py-3 w-[30%] sm:w-[25%]">
              <span className="block truncate">Details</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {itinerary.map((phase, index) => (
            <React.Fragment key={index}>
              <tr
                className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => toggleRow(index)}
              >
                <th
                  scope="row"
                  className="px-2 sm:px-6 py-4 font-medium text-slate-900 w-[10%]"
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        expandedRows.has(index) ? "rotate-90" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <span className="hidden sm:block">Day {index + 1}</span>
                    <span className="block sm:hidden">{index + 1}</span>
                  </div>
                </th>
                <td className="px-2 sm:px-6 py-4 w-[70%]">
                  <span className="block wrap">{phase.title}</span>
                </td>
                <td className="px-2 sm:px-6 py-4 w-[20%]">
                  <div className="flex flex-col sm:flex-row sm:gap-2 text-sm">
                    {phase.distance && <span>{phase.distance}km</span>}
                    {phase.elevation && <span>{phase.elevation}m</span>}
                  </div>
                </td>
              </tr>
              {expandedRows.has(index) && (
                <tr className="bg-gray-50">
                  <td colSpan={4} className="px-2 sm:px-6 py-4">
                    <div className="text-slate-700">
                      <p className="text-sm break-words">{phase.description}</p>
                      {phase.images && (
                        <div className="mt-4 flex flex-wrap gap-2 sm:gap-4">
                          {phase.images.map((img, imgIndex) => (
                            <div
                              key={imgIndex}
                              className="w-20 h-20 sm:w-24 sm:h-24"
                            >
                              <Image
                                path={img}
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItineraryTable;
