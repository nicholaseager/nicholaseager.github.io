import { glob, file } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import photosData from "./data/photos.json";

const guides = defineCollection({
  loader: glob({ base: "./src/data/guides", pattern: "**/*.json" }),
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
    overview: z
      .object({
        summary: z.string(),
        images: z.array(z.string()).optional(),
      })
      .optional(),
    map: z
      .object({
        introduction: z.string().optional(),
        id: z.string(),
      })
      .optional(),
    basics: z
      .object({
        items: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
          })
        ),
      })
      .optional(),
    gear: z
      .object({
        introduction: z.string().optional(),
        trip: z.string(),
      })
      .optional(),
    weather: z
      .object({
        introduction: z.string().optional(),
        seasons: z
          .array(
            z.object({
              title: z.string(),
              description: z.string(),
            })
          )
          .optional(),
      })
      .optional(),
    itinerary: z
      .object({
        introduction: z.string().optional(),
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
      })
      .optional(),
    extra_sections: z
      .array(
        z.object({
          title: z.string(),
          id: z.string().optional(),
          description: z.string(),
          sections: z
            .array(
              z.object({
                title: z.string(),
                description: z.string(),
                images: z.array(z.string()).optional(),
              })
            )
            .optional(),
        })
      )
      .optional(),
    partnership: z
      .object({
        title: z.string(),
        description: z.string(),
        logo: z.string(),
        link: z.string(),
      })
      .optional(),
    highlights: z
      .object({
        introduction: z.string().optional(),
        items: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
            images: z.array(z.string()).optional(),
          })
        ),
      })
      .optional(),
  }),
});

interface PhotoItem {
  path: string;
  description: string;
  tags: string[];
  "darkroom-id"?: string | number;
  "youtube-id"?: string;
}

const photos = defineCollection({
  loader: () => {
    return (photosData as PhotoItem[]).map((photo, index) => ({
      id: photo.path.replace(/^photos\//, ""),
      ...photo,
    }));
  },
  schema: z.object({
    path: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    "darkroom-id": z.union([z.string(), z.number()]).optional(),
    "youtube-id": z.string().optional(),
  }),
});

const films = defineCollection({
  loader: file("./src/data/films.json"),
  schema: z.object({
    id: z.string(),
    tags: z.string(),
  }),
});

interface LocationItem {
  id: string;
  path: string;
  type: "country" | "region" | "locality";
  name: string;
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
      const parts = path.split("/");
      // Convert kebab-case to Title Case (e.g. "new-zealand" -> "New Zealand")
      const name = parts[parts.length - 1]
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      // Parent path is everything before the last segment
      // e.g. for "france/chamonix/argentiere", parent is "france/chamonix"
      const parentPath = parts.length > 1 ? parts.slice(0, -1).join("/") : null;

      locationMap.set(path, {
        id: path,
        path,
        type,
        name,
        parentPath,
        photos: [photoPath],
        previewImage: photoPath, // Use first photo as preview (could be enhanced to pick best photo)
      });
    };

    // Process each photo to build the complete location hierarchy
    (photosData as PhotoItem[]).forEach((photo) => {
      // Extract location parts from photo path, removing prefix and the photo name
      const parts = photo.path.replace(/^photos\/countries\//, "").split("/");
      parts.pop(); // Remove the actual photo name from the path

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
    parentPath: z.string().nullable(),
    photos: z.array(z.string()),
    previewImage: z.string(),
  }),
});

interface ThemeItem {
  id: string;
  path: string;
  title: string;
  photos: string[];
  previewImage: string;
}

/**
 * Collection for organizing photos by their themes/tags
 * Each theme tracks its associated photos
 *
 * Example:
 * For photo with tags ["mountains", "landscapes"], creates:
 * {
 *   "mountains": {
 *     title: "Mountains",
 *     photos: ["photos/countries/nepal/everest.jpg"]
 *   },
 *   "landscapes": {
 *     title: "Landscapes",
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

      // Convert kebab-case to Title Case (e.g. "night-sky" -> "Night Sky")
      const title = tag
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      themeMap.set(tag, {
        id: tag,
        path: tag,
        title,
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
