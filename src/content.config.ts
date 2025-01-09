import { glob, file } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import photosData from "./data/photos.json";
import galleriesData from "./data/galleries.json";

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

interface GalleryItem {
  title: string;
  tags: string[];
  description: string;
  image: string;
}

const galleries = defineCollection({
  loader: () => {
    return (galleriesData as GalleryItem[]).map((gallery) => ({
      id: gallery.title.toLowerCase().replace(/\s+/g, "-"),
      ...gallery,
    }));
  },
  schema: z.object({
    id: z.string(),
    title: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
    image: z.string(),
  }),
});

export const collections = { guides, photos, films, galleries };
