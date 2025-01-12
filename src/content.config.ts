import { glob, file } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { getPhotoLocationParts } from "./utils/photo-paths";
import { kebabToTitleCase } from "./utils/kebab";
import photosData from "./data/photos.json";
import photoTagDefinitionsData from "./data/photo-tag-definitions.json";
import photoLocationDefinitionsData from "./data/photo-location-definitions.json";

const guides = defineCollection({
  loader: glob({
    base: "./src/data/guides",
    // Include subfolders (i.e. /drafts) in dev and ignore them in prod
    pattern: import.meta.env.PROD ? "*.json" : "**/*.json",
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    modified_date: z.coerce.date(),
    description: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    location: z
      .object({
        name: z.string(),
        locality: z.string().optional(),
        region: z.string().optional(),
        country: z.string(),
        latitude: z.string(),
        longitude: z.string(),
      })
      .optional(),
    short_name: z.string(),
    youtube: z.string().optional(),
    introduction: z.string(),
    conclusion: z.string().optional(),
    links: z
      .array(
        z.object({
          title: z.string(),
          url: z.string(),
        })
      )
      .optional(),

    sections: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        introduction: z.string().optional(),
        conclusion: z.string().optional(),
        background: z.enum(["default", "dark"]).optional(),
        toc: z.boolean().optional(),
        cta: z
          .object({
            title: z.string(),
            url: z.string().url(),
          })
          .optional(),
        subsections: z
          .array(
            z.object({
              title: z.string(),
              description: z.string(),
              images: z.array(z.string()).optional(),
            })
          )
          .optional(),
        content: z
          .discriminatedUnion("type", [
            // Image gallery
            z.object({
              type: z.literal("images"),
              paths: z.array(z.string()),
            }),

            // Google Map
            z.object({
              type: z.literal("google-map"),
              mapId: z.string(),
            }),

            // Itinerary table
            z.object({
              type: z.literal("itinerary"),
              duration: z.string().optional(), // ISO 8601 duration format (e.g. P9D)
              units: z
                .object({
                  phase: z.string().optional(),
                  distance: z.string().optional(),
                  elevation: z.string().optional(),
                })
                .optional(),
              phases: z.array(
                z.object({
                  title: z.string(),
                  description: z.string().optional(),
                  distance: z.number().optional(),
                  elevation: z.number().optional(),
                  images: z.array(z.string()).optional(),
                })
              ),
            }),

            // Gear swiper
            z.object({
              type: z.literal("gear"),
              trip: z.string(),
            }),

            // List of items
            z.object({
              type: z.literal("list"),
              items: z.array(
                z.object({
                  title: z.string(),
                  description: z.string(),
                })
              ),
            }),

            // Partnership
            z.object({
              type: z.literal("partnership"),
              logo: z.string(),
              cta: z
                .object({
                  title: z.string(),
                  url: z.string().url(),
                })
                .optional(),
            }),

            // Weather
            z.object({
              type: z.literal("weather"),
              seasons: z.array(
                z.object({
                  name: z.string(),
                  months: z.string(),
                  conditions: z.string(),
                  bestFor: z.array(z.string()).optional(),
                })
              ),
            }),
          ])
          .optional(),
      })
    ),
  }),
});

const films = defineCollection({
  loader: file("./src/data/films.json"),
  schema: z.object({
    id: z.string(),
    tags: z.string(),
  }),
});

interface PhotoItem {
  path: string;
  description: string;
  tags: string[];
  "darkroom-id"?: string | number;
  "youtube-id"?: string;
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
const photos = defineCollection({
  loader: () => {
    return (photosData as PhotoItem[]).map((photo) => {
      const pathParts = photo.path.split("/");

      // Parse title from the last part of the path
      const title = kebabToTitleCase(pathParts[pathParts.length - 1]);

      // Parse location from the path parts between "photos/countries" and filename
      const location = pathParts
        .slice(2, -1) // Skip "photos" and "countries" prefix, and exclude the filename
        .map((part) => kebabToTitleCase(part))
        .join(" / ");

      return {
        id: photo.path.replace(/^photos\//, ""),
        title,
        location,
        ...photo,
      };
    });
  },
  schema: z.object({
    path: z.string(),
    title: z.string(),
    location: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    "darkroom-id": z.union([z.string(), z.number()]).optional(),
    "youtube-id": z.string().optional(),
  }),
});

interface LocationItem {
  id: string;
  path: string;
  type: "country" | "region" | "locality";
  name: string;
  description: string;
  parentPath: string | null;
  photos: string[];
  previewImage: string;
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
const photoLocations = defineCollection({
  loader: () => {
    // Map to store unique locations keyed by their path
    // This prevents duplicates and allows easy updates when photos share locations
    const locationMap = new Map<string, LocationItem>();

    /**
     * Gets location metadata from definitions file
     * @param path - The location path (e.g. "france" or "france/chamonix")
     * @returns Location metadata with fallbacks
     */
    const getLocationMetadata = (path: string) => {
      const parts = path.split("/");
      const country = parts[0];
      const location = parts[1];

      // Get country data
      const countryData = (
        photoLocationDefinitionsData.countries as Record<string, any>
      )[country];

      // If this is a country-level path
      if (parts.length === 1) {
        // Convert kebab-case to Title Case for fallback
        const fallbackTitle = kebabToTitleCase(country);

        return {
          title: countryData?.title || fallbackTitle,
          description:
            countryData?.description || `Photos from ${fallbackTitle}`,
        };
      }

      // If this is a location within a country
      const locationData = countryData?.locations?.[location];

      // Convert kebab-case to Title Case for fallback
      const fallbackTitle = kebabToTitleCase(location);

      return {
        title: locationData?.title || fallbackTitle,
        description:
          locationData?.description ||
          `Photos from ${fallbackTitle}, ${countryData?.title || country}`,
      };
    };

    /**
     * Creates a new location or adds a photo to an existing one
     * @param path - The location path (e.g. "france" or "france/chamonix")
     * @param type - The location type (country, region, or locality)
     * @param photoPath - Full path of the photo to add to this location
     */
    const addLocation = (
      path: string,
      type: LocationItem["type"],
      photoPath: string
    ) => {
      // If location exists, just add the photo to it
      const existingLocation = locationMap.get(path);
      if (existingLocation) {
        existingLocation.photos.push(photoPath);
        return;
      }

      // Create new location
      const { title, description } = getLocationMetadata(path);
      const parts = path.split("/");

      // Parent path is everything before the last segment
      // e.g. for "france/chamonix/argentiere", parent is "france/chamonix"
      const parentPath = parts.length > 1 ? parts.slice(0, -1).join("/") : null;

      locationMap.set(path, {
        id: path,
        path,
        type,
        name: title,
        description,
        parentPath,
        photos: [photoPath],
        previewImage: photoPath, // Use first photo as preview (could be enhanced to pick best photo)
      });
    };

    // Process each photo to build the complete location hierarchy
    (photosData as PhotoItem[]).forEach((photo) => {
      const parts = getPhotoLocationParts(photo.path);

      // Build locations for each level of the hierarchy
      let currentPath = "";
      parts.forEach((part, index) => {
        // Build up the path one segment at a time
        currentPath = currentPath ? `${currentPath}/${part}` : part;

        // Determine location type based on depth in hierarchy
        const type =
          index === 0
            ? "country" // First level is always country
            : index === 1
            ? "region" // Second level is region
            : "locality"; // Everything deeper is a locality

        addLocation(currentPath, type, photo.path);
      });
    });

    // Convert map to array for Astro collection
    return Array.from(locationMap.values());
  },
  schema: z.object({
    id: z.string(),
    path: z.string(),
    type: z.enum(["country", "region", "locality"]),
    name: z.string(),
    description: z.string(),
    parentPath: z.string().nullable(),
    photos: z.array(z.string()),
    previewImage: z.string(),
  }),
});

interface ThemeItem {
  id: string;
  path: string;
  title: string;
  description: string;
  photos: string[];
  previewImage: string;
  sortOrder?: number;
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
const photoThemes = defineCollection({
  loader: () => {
    // Map to store unique themes keyed by tag name
    const themeMap = new Map<string, ThemeItem>();

    /**
     * Creates a new theme or adds a photo to an existing one
     * @param tag - The tag name (e.g. "mountains" or "landscapes")
     * @param photoPath - Full path of the photo to add to this theme
     */
    const addTheme = (tag: string, photoPath: string) => {
      // If theme exists, just add the photo to it
      const existingTheme = themeMap.get(tag);
      if (existingTheme) {
        existingTheme.photos.push(photoPath);
        return;
      }

      // Get tag definition if it exists
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

      // Convert kebab-case to Title Case as fallback if no title defined
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
        previewImage: photoPath, // Use first photo as preview
      });
    };

    // Process each photo to build the themes
    (photosData as PhotoItem[]).forEach((photo) => {
      // Add photo to each of its tags/themes
      photo.tags.forEach((tag) => {
        addTheme(tag, photo.path);
      });
    });

    // Convert map to array for Astro collection
    return Array.from(themeMap.values());
  },
  schema: z.object({
    id: z.string(),
    path: z.string(),
    title: z.string(),
    description: z.string().optional(),
    sortOrder: z.number().optional(),
    photos: z.array(z.string()),
    previewImage: z.string(),
  }),
});

export const collections = {
  guides,
  photos,
  films,
  photoLocations,
  photoThemes,
};
