import React, { useState } from "react";
import Image from "../image-kit/Image";
import FullScreenGallery from "../photos/FullScreenGallery";

interface Column {
  id: string;
  label: string;
  width: string;
}

interface ExpandedContent {
  description?: string;
  images?: string[];
}

interface Row {
  cells: { [key: string]: React.ReactNode };
  expandedContent?: ExpandedContent;
}

interface Props {
  columns: Column[];
  rows: Row[];
  className?: string;
}

const CollapsibleTable: React.FC<Props> = ({
  columns,
  rows,
  className = "",
}) => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [selectedImageData, setSelectedImageData] = useState<{
    images: string[];
    index: number;
  } | null>(null);

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

  const handleImageClick = (images: string[], index: number) => {
    setSelectedImageData({ images, index });
  };

  const handleCloseGallery = () => {
    setSelectedImageData(null);
  };

  return (
    <>
      <div
        className={`overflow-x-auto shadow-md rounded-lg max-w-full ${className}`}
      >
        <table className="table-fixed w-full text-sm text-left">
          <thead className="text-xs text-slate-700 uppercase bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className="px-2 sm:px-6 py-3"
                  style={{ width: column.width }}
                >
                  <span className="block truncate">{column.label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <React.Fragment key={index}>
                <tr
                  className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleRow(index)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className="px-2 sm:px-6 py-4"
                      style={{ width: column.width }}
                    >
                      <div className="flex items-center gap-2">
                        {column.id === columns[0].id && (
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
                        )}
                        {row.cells[column.id]}
                      </div>
                    </td>
                  ))}
                </tr>
                {expandedRows.has(index) && row.expandedContent && (
                  <tr className="bg-gray-50">
                    <td colSpan={columns.length} className="px-2 sm:px-6 py-4">
                      <div className="text-slate-700">
                        {row.expandedContent.description && (
                          <p className="text-sm break-words">
                            {row.expandedContent.description}
                          </p>
                        )}
                        {row.expandedContent.images && (
                          <div className="mt-4 flex flex-wrap gap-2 sm:gap-4">
                            {row.expandedContent.images.map((img, imgIndex) => (
                              <div
                                key={imgIndex}
                                className="w-20 h-20 sm:w-24 sm:h-24 cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleImageClick(
                                    row.expandedContent!.images!,
                                    imgIndex
                                  );
                                }}
                              >
                                <Image
                                  path={img}
                                  className="w-full h-full object-cover rounded"
                                  sizes="(min-width: 640px) 96px, 80px"
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

      {selectedImageData && (
        <FullScreenGallery
          photos={selectedImageData.images}
          startIndex={selectedImageData.index}
          showOrderPrintButton={false}
          onClose={handleCloseGallery}
        />
      )}
    </>
  );
};

export default CollapsibleTable;
