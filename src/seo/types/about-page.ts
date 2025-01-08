import type { AboutPage } from "schema-dts";

interface AboutPageSchemaProps {
  name: string;
  description: string;
  url: URL;
}

export function aboutPageFrom({
  name,
  description,
  url,
}: AboutPageSchemaProps): AboutPage {
  return {
    "@type": "AboutPage",
    "@id": `${url}`,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${url}#website`,
    },
    url: `${url}`,
    name,
    description,
  };
}
