import { glob, file } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { kebabToTitleCase } from "./utils/kebab";

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

/**
 * Collection for managing maps with their metadata
 */
const maps = defineCollection({
  loader: glob({
    base: "./src/data/maps",
    pattern: "**/*.json",
  }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    mapId: z.string(),
    date: z.coerce.date(),
    modified_date: z.coerce.date(),
    tags: z.array(z.string()),
    location: z.object({
      name: z.string(),
      locality: z.string().optional(),
      region: z.string().optional(),
      country: z.string(),
      latitude: z.string(),
      longitude: z.string(),
    }),
    links: z.array(
      z.object({
        title: z.string(),
        url: z.string(),
      })
    ),
  }),
});

/**
 * Collection for managing photos with their metadata
 */
const photos = defineCollection({
  loader: file("./src/data/photos.json"),
  schema: z
    .object({
      slug: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      "darkroom-id": z.union([z.string(), z.number()]).optional(),
      "youtube-id": z.string().optional(),
    })
    .transform((data) => {
      const pathParts = data.slug.split("/");

      // Parse title from the last part of the path
      const title = kebabToTitleCase(pathParts[pathParts.length - 1]);

      // Parse location from the path parts between "photos/countries" and filename
      const location = pathParts
        .slice(2, -1)
        .map((part) => kebabToTitleCase(part))
        .join(" / ");

      return {
        ...data,
        title,
        location,
      };
    }),
});

/**
 * Collection for managing photo locations
 */
const photoLocations = defineCollection({
  loader: file("./src/data/photo-locations.json"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
  }),
});

/**
 * Collection for organizing photos by their themes/tags
 */
const photoThemes = defineCollection({
  loader: file("./src/data/photo-themes.json"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  guides,
  films,
  maps,
  photos,
  photoLocations,
  photoThemes,
};
