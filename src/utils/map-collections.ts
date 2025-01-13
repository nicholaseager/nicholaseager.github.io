/**
 * Represents hiking map data with a unique slug identifier and display name
 */
export interface HikingMapData {
  slug: string;
  name: string;
}

/**
 * Maps location strings to arrays of hiking map data
 */
export interface LocationMap {
  [key: string]: HikingMapData[];
}

/**
 * Retrieves a list of all unique hiking locations from map JSON files
 * @returns Array of location strings
 */
export function getAllLocations(): string[] {
  try {
    const files = import.meta.glob("/src/data/maps/**/*.json", { eager: true });

    if (!files || typeof files !== "object") {
      console.warn("No map files found or invalid files structure");
      return [];
    }

    const locations = new Set<string>();

    Object.keys(files).forEach((file) => {
      if (!file || typeof file !== "string") {
        console.warn(`Invalid file path encountered: ${file}`);
        return;
      }

      const pathParts = file.split("/");
      if (pathParts.length < 5) {
        console.warn(`Invalid file path structure: ${file}`);
        return;
      }

      const location = pathParts[4];
      if (location) {
        locations.add(location);
      }
    });

    return Array.from(locations);
  } catch (error) {
    console.error("Error while getting locations:", error);
    return [];
  }
}

/**
 * Gets all hiking data organized by location from map JSON files
 * @returns Object containing:
 *  - locations: Set of unique location strings
 *  - locationMap: Map of locations to their hiking map data
 */
export function getAllHikingMapsByLocation(): {
  locations: Set<string>;
  locationMap: LocationMap;
} {
  try {
    const files = import.meta.glob<HikingMapData>("/src/data/maps/**/*.json", {
      eager: true,
    });

    if (!files || typeof files !== "object") {
      console.warn("No map files found or invalid files structure");
      return { locations: new Set(), locationMap: {} };
    }

    const locations = new Set<string>();
    const locationMap: LocationMap = {};

    Object.entries(files).forEach(([path, content]) => {
      if (!path || typeof path !== "string") {
        console.warn(`Invalid path encountered: ${path}`);
        return;
      }

      const pathParts = path.split("/");
      if (pathParts.length < 6) {
        console.warn(`Invalid path structure: ${path}`);
        return;
      }

      const location = pathParts[4];
      const slugWithExt = pathParts[5];

      if (!location || !slugWithExt) {
        console.warn(`Missing location or slug in path: ${path}`);
        return;
      }

      if (!content || typeof content !== "object" || !("name" in content)) {
        console.warn(`Invalid content structure for: ${path}`);
        return;
      }

      const slug = slugWithExt.replace(/\.json$/, "");

      locations.add(location);

      if (!locationMap[location]) {
        locationMap[location] = [];
      }

      locationMap[location].push({
        ...content,
        slug,
      });
    });

    return { locations, locationMap };
  } catch (error) {
    console.error("Error while getting hikes by location:", error);
    return { locations: new Set(), locationMap: {} };
  }
}
