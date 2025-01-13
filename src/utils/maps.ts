export interface HikingMapData {
  slug: string;
  name: string;
}

export interface LocationMap {
  [key: string]: HikingMapData[];
}

export function getAllLocations(): string[] {
  const files = import.meta.glob("/src/data/maps/**/*.json", { eager: true });
  const locations = new Set<string>();

  Object.keys(files).forEach((file) => {
    const location = file.split("/")[4];
    locations.add(location);
  });

  return Array.from(locations);
}

export function getAllHikesByLocation() {
  const files = import.meta.glob<HikingMapData>("/src/data/maps/**/*.json", {
    eager: true,
  });
  const locations = new Set<string>();
  const locationMap: LocationMap = {};

  Object.entries(files).forEach(([path, content]) => {
    const location = path.split("/")[4];
    const slug = path.split("/")[5].replace(".json", "");

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
}
