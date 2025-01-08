import type { CreativeWork } from "schema-dts";
import { authorFrom } from "./author";

export interface Location {
  name: string;
  latitude?: string;
  longitude?: string;
  mapId?: string;
}

export interface Audience {
  type: string;
}

export interface CreativeWorkSchemaProps {
  name: string;
  url: string | URL;
  datePublished: string;
  dateModified: string;
  audience?: Audience;
  educationalLevel?: string;
  location?: Location;
}

export function creativeWorkFrom({
  name,
  url,
  datePublished,
  dateModified,
  audience,
  educationalLevel,
  location,
}: CreativeWorkSchemaProps): CreativeWork {
  return {
    "@id": new URL("#creativeWork", url).toString(),
    "@type": "CreativeWork",
    isPartOf: {
      "@id": new URL("#webpage", url).toString(),
    },
    name,
    url: url.toString(),
    datePublished,
    dateModified,
    author: authorFrom({ url }),
    ...(audience && {
      audience: {
        "@type": "Audience",
        audienceType: audience.type,
      },
    }),
    ...(educationalLevel && { educationalLevel }),
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
  };
}
