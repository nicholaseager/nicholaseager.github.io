import { kebabToTitleCase } from "./kebab";

export interface HikingMapItem {
  id: string;
  name: string;
}

export interface HikingMapLocationItem {
  id: string;
  name: string;
  maps: HikingMapItem[];
}

/**
 * Gets all hiking data organized by location from map JSON files
 */
export function getHikingMapLocations(): HikingMapLocationItem[] {
  try {
    const files = import.meta.glob("/src/data/maps/**/*.json", { eager: true });
    const locationMap = new Map<string, HikingMapLocationItem>();

    if (!files || typeof files !== "object") {
      console.warn("No map files found or invalid files structure");
      return [];
    }

    Object.keys(files).forEach((path) => {
      const pathParts = path.split("/");
      const locationParts = pathParts.slice(4, -1);
      const locationPath = locationParts.join("/");
      const mapId = pathParts[5].replace(".json", "");
      const map = {
        id: mapId,
        name: kebabToTitleCase(mapId),
      };

      const existingLocation = locationMap.get(locationPath);
      if (existingLocation) {
        existingLocation.maps.push(map);
        return;
      }

      locationMap.set(locationPath, {
        id: locationPath,
        name: locationParts.map((part) => kebabToTitleCase(part)).join(" / "),
        maps: [map],
      });
    });

    return Array.from(locationMap.values());
  } catch (error) {
    console.error("Error while getting hiking locations:", error);
    return [];
  }
}
