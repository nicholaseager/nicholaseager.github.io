import type { Guide } from "schema-dts";
import { authorFrom } from "./author";
import { imageFromPath } from "./image";

export interface GuideSchemaProps {
  name: string;
  url: string | URL;
  datePublished: string;
  dateModified: string;
  description?: string;
  image?: string;
  location?: {
    name: string;
    latitude?: string;
    longitude?: string;
    mapId?: string;
  };
  targetAudience?: string;
}

export function guideFrom({
  name,
  url,
  datePublished,
  dateModified,
  description,
  image,
  location,
  targetAudience,
}: GuideSchemaProps): Guide {
  return {
    "@id": new URL("#guide", url).toString(),
    "@type": "Guide",
    isPartOf: {
      "@id": new URL("#webpage", url).toString(),
    },
    name,
    url: url.toString(),
    datePublished,
    dateModified,
    ...(description && { description }),
    author: authorFrom({ url }),
    ...(image && {
      image: imageFromPath(url, image),
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
    ...(targetAudience && {
      audience: {
        "@type": "Audience",
        audienceType: targetAudience,
      },
    }),
  };
}
