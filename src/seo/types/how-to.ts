import type { HowTo } from "schema-dts";
import { imageFromPath } from "./image";

export interface HowToStep {
  title: string;
  description?: string;
  image?: string;
}

export interface HowToTool {
  title: string;
  url: string;
}

export interface HowToSchemaProps {
  name: string;
  url: string | URL;
  datePublished: string;
  dateModified: string;
  totalTime?: string;
  steps?: HowToStep[];
  tools?: HowToTool[];
}

export function howToFrom({
  name,
  url,
  datePublished,
  dateModified,
  totalTime,
  steps,
  tools,
}: HowToSchemaProps): HowTo {
  return {
    "@id": new URL("#howto", url).toString(),
    "@type": "HowTo",
    isPartOf: {
      "@id": new URL("#webpage", url).toString(),
    },
    name,
    url: url.toString(),
    datePublished,
    dateModified,
    ...(totalTime && { totalTime }),
    ...(steps && {
      step: steps.map((step, index) => ({
        "@type": "HowToStep",
        name: `Step ${index + 1}: ${step.title}`,
        text: step.description,
        ...(step.image && {
          image: imageFromPath(url, step.image),
        }),
      })),
    }),
    ...(tools && {
      tool: tools.map((tool) => ({
        "@type": "HowToTool",
        name: tool.title,
        url: tool.url,
      })),
    }),
  };
}
