import { kebabToTitleCase } from "./kebab";
import { getPhotoLocationParts } from "./photo-paths";
import photosData from "../data/photos.json";
import photoTagDefinitionsData from "../data/photo-tag-definitions.json";
import photoLocationDefinitionsData from "../data/photo-location-definitions.json";

interface PhotoItem {
  id: string;
  path: string;
  title: string;
  location: string;
  description: string;
  tags: string[];
  "darkroom-id"?: string | number;
  "youtube-id"?: string;
}

interface PhotoLocationItem {
  id: string;
  path: string;
  type: "country" | "region" | "locality";
  name: string;
  description: string;
  parentPath: string | null;
  photos: string[];
  previewImage: string;
}

interface PhotoThemeItem {
  id: string;
  path: string;
  title: string;
  description: string;
  photos: string[];
  previewImage: string;
  sortOrder?: number;
}

/**
 * Gets location metadata from definitions file
 */
function getLocationMetadata(path: string) {
  const parts = path.split("/");
  const country = parts[0];
  const location = parts[1];

  const countryData = (
    photoLocationDefinitionsData.countries as Record<string, any>
  )[country];

  if (parts.length === 1) {
    const fallbackTitle = kebabToTitleCase(country);
    return {
      title: countryData?.title || fallbackTitle,
      description: countryData?.description || `Photos from ${fallbackTitle}`,
    };
  }

  const locationData = countryData?.locations?.[location];
  const fallbackTitle = kebabToTitleCase(location);

  return {
    title: locationData?.title || fallbackTitle,
    description:
      locationData?.description ||
      `Photos from ${fallbackTitle}, ${countryData?.title || country}`,
  };
}

/**
 * Collection for managing photos with their metadata
 * Each photo has a path, title, location, description and tags
 *
 * Example:
 * For photo path "photos/countries/france/chamonix/mountain.jpg", creates:
 * {
 *   id: "countries/france/chamonix/mountain.jpg",
 *   title: "Mountain",
 *   location: "France / Chamonix",
 *   description: "Mountain vista in Chamonix",
 *   tags: ["mountains", "landscapes"],
 *   darkroom-id: "123", // Optional darkroom reference
 *   youtube-id: "abc123" // Optional related video
 * }
 */
export function getPhotoItems(): PhotoItem[] {
  return (photosData as PhotoItem[]).map((photo) => {
    const pathParts = photo.path.split("/");

    // Parse title from the last part of the path
    const title = kebabToTitleCase(pathParts[pathParts.length - 1]);

    // Parse location from the path parts between "photos/countries" and filename
    const location = pathParts
      .slice(2, -1)
      .map((part) => kebabToTitleCase(part))
      .join(" / ");

    return {
      ...photo,
      id: photo.path.replace(/^photos\//, ""),
      title,
      location,
    };
  });
}

/**
 * Collection for managing hierarchical photo locations (countries, regions, localities)
 * Each location tracks its photos and maintains parent/child relationships
 *
 * Example:
 * For photo path "photos/countries/france/chamonix/mountain.jpg", creates:
 * {
 *   "france": {
 *     type: "country",
 *     name: "France",
 *     parentPath: null,
 *     photos: ["photos/countries/france/chamonix/mountain.jpg"]
 *   },
 *   "france/chamonix": {
 *     type: "region",
 *     name: "Chamonix",
 *     parentPath: "france",
 *     photos: ["photos/countries/france/chamonix/mountain.jpg"]
 *   }
 * }
 *
 * Examples of paths and their corresponding types:
 * - "france" (country)
 * - "france/chamonix" (region)
 * - "france/chamonix/argentiere" (locality)
 */
export function getPhotoLocations(): PhotoLocationItem[] {
  const locationMap = new Map<string, PhotoLocationItem>();

  const addLocation = (
    path: string,
    type: PhotoLocationItem["type"],
    photoPath: string
  ) => {
    const existingLocation = locationMap.get(path);
    if (existingLocation) {
      existingLocation.photos.push(photoPath);
      return;
    }

    const { title, description } = getLocationMetadata(path);
    const parts = path.split("/");
    const parentPath = parts.length > 1 ? parts.slice(0, -1).join("/") : null;

    locationMap.set(path, {
      id: path,
      path,
      type,
      name: title,
      description,
      parentPath,
      photos: [photoPath],
      previewImage: photoPath,
    });
  };

  (photosData as PhotoItem[]).forEach((photo) => {
    const parts = getPhotoLocationParts(photo.path);

    let currentPath = "";
    parts.forEach((part, index) => {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      const type =
        index === 0 ? "country" : index === 1 ? "region" : "locality";
      addLocation(currentPath, type, photo.path);
    });
  });

  return Array.from(locationMap.values());
}

/**
 * Collection for organizing photos by their themes/tags
 * Each theme tracks its associated photos and uses metadata from photo-tag-definitions.json
 *
 * Example:
 * For photo with tags ["mountains", "landscapes"], creates:
 * {
 *   "mountains": {
 *     title: "Mountain Photography",
 *     description: "Majestic peaks and dramatic mountain ranges reaching into the sky",
 *     sortOrder: 2,
 *     photos: ["photos/countries/nepal/everest.jpg"]
 *   },
 *   "landscapes": {
 *     title: "Landscape Photography",
 *     description: "Captivating natural vistas and scenic views from around the world",
 *     sortOrder: 1,
 *     photos: ["photos/countries/nepal/everest.jpg"]
 *   }
 * }
 */
export function getPhotoThemes(): PhotoThemeItem[] {
  const themeMap = new Map<string, PhotoThemeItem>();

  const addTheme = (tag: string, photoPath: string) => {
    const existingTheme = themeMap.get(tag);
    if (existingTheme) {
      existingTheme.photos.push(photoPath);
      return;
    }

    const tagDef = (
      photoTagDefinitionsData as Record<
        string,
        {
          title?: string;
          description?: string;
          sortOrder?: number;
        }
      >
    )[tag];

    const fallbackTitle = kebabToTitleCase(tag);
    const title = tagDef?.title || fallbackTitle;
    const fallbackDescription = `A collection of ${title.toLowerCase()} from around the world`;

    themeMap.set(tag, {
      id: tag,
      path: tag,
      title: title,
      description: tagDef?.description || fallbackDescription,
      sortOrder: tagDef?.sortOrder,
      photos: [photoPath],
      previewImage: photoPath,
    });
  };

  (photosData as PhotoItem[]).forEach((photo) => {
    photo.tags.forEach((tag) => {
      addTheme(tag, photo.path);
    });
  });

  return Array.from(themeMap.values());
}
