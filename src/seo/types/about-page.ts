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
    "@id": new URL("#about", url).toString(),
    isPartOf: {
      "@type": "WebSite",
      "@id": new URL("#website", url).toString(),
    },
    url: `${url}`,
    name,
    description,
  };
}
