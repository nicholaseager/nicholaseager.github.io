import { glob, file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const guides = defineCollection({
  loader: glob({ base: "./src/data/guides", pattern: "**/*.json" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    modified_date: z.coerce.date(),
    description: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
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
        seasons: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
          })
        ),
      })
      .optional(),
    itinerary: z
      .object({
        introduction: z.string().optional(),
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

export const collections = { guides };
