import type { Article } from "schema-dts";
import { authorFrom } from "./author";
import { organizationFrom } from "./organization";
import { imageFromPath } from "./image";

export interface ArticleSchemaProps {
  name: string;
  headline: string;
  abstract: string;
  description: string;
  url: string | URL;
  datePublished: string;
  dateModified: string;
  image?: string;
  location?: {
    name: string;
    latitude?: string;
    longitude?: string;
    mapId?: string;
  };
  keywords: string[];
}

export function articleFrom({
  name,
  headline,
  abstract,
  description,
  url,
  datePublished,
  dateModified,
  image,
  location,
  keywords,
}: ArticleSchemaProps): Article {
  return {
    "@id": new URL("#article", url).toString(),
    "@type": "Article",
    isPartOf: {
      "@id": new URL("#webpage", url).toString(),
    },
    name,
    headline,
    abstract,
    description,
    url: url.toString(),
    datePublished,
    dateModified,
    author: authorFrom({ url }),
    publisher: organizationFrom({ url }),
    ...(image && {
      image: imageFromPath(
        url,
        image,
        new URL("#primaryImage", url).toString()
      ),
    }),
    ...(location && {
      contentLocation: {
        "@type": "Place",
        name: location.name,
        ...(location.latitude &&
          location.longitude && {
            geo: {
              "@type": "GeoCoordinates",
              latitude: location.latitude,
              longitude: location.longitude,
            },
          }),
        ...(location.mapId && {
          map: `https://www.google.com/maps/d/viewer?mid=${location.mapId}`,
        }),
      },
    }),
    keywords,
  };
}
